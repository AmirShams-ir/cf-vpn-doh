// Unified CF-VPN + Cloudflare DNS-over-HTTPS Worker.
// DoH is served at /dns-query. All other requests are handled by the VPN worker.

import vpnWorker from "./worker.js";

const DOH_UPSTREAMS = [
  "https://security.cloudflare-dns.com/dns-query",
  "https://dns.google/dns-query",
  "https://dns.quad9.net/dns-query",
];

const DNS_MESSAGE = "application/dns-message";
const DNS_JSON = "application/dns-json";
const DOH_PATH = "/dns-query";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === DOH_PATH) {
      return handleDoH(request);
    }

    return vpnWorker.fetch(request, env, ctx);
  },
};

async function handleDoH(request) {
  const { method, headers } = request;
  const parsed = new URL(request.url);
  const accept = (headers.get("accept") || "").toLowerCase();
  const contentType = (headers.get("content-type") || "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // DNS wire-format GET: /dns-query?dns=<base64url>
  if (method === "GET" && parsed.searchParams.has("dns")) {
    return raceFetch(parsed.searchParams.toString(), DNS_MESSAGE, false, null);
  }

  // DNS wire-format POST.
  if (method === "POST" && contentType === DNS_MESSAGE) {
    const body = await request.arrayBuffer();
    return raceFetch("", DNS_MESSAGE, true, body);
  }

  // DNS JSON API: /dns-query?name=example.com&type=A
  if (method === "GET" && accept.includes(DNS_JSON)) {
    return raceFetch(parsed.searchParams.toString(), DNS_JSON, false, null);
  }

  return new Response("Unsupported DNS request", {
    status: 400,
    headers: { "Cache-Control": "no-store" },
  });
}

async function raceFetch(search, acceptType, isPost, body) {
  const attempts = DOH_UPSTREAMS.map(async (base) => {
    // Upstream paths already contain /dns-query; append the client's query string.
    const upstreamUrl = search ? `${base}?${search}` : base;
    const response = await fetch(upstreamUrl, {
      method: isPost ? "POST" : "GET",
      headers: {
        Accept: acceptType,
        ...(isPost ? { "Content-Type": DNS_MESSAGE } : {}),
      },
      ...(isPost ? { body } : {}),
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) {
      throw new Error(`DoH upstream returned HTTP ${response.status}`);
    }

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Cache-Control", "no-store");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Accept");
    responseHeaders.set("Content-Type", acceptType);

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  });

  // First healthy upstream wins; failures automatically fall through.
  try {
    return await Promise.any(attempts);
  } catch {
    return new Response("All DNS-over-HTTPS upstreams failed", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
