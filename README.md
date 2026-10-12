# CF-VPN + CF-DOH

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AmirShams-ir/CF-VPN)

**One Worker for Cloudflare edge proxy configuration and DNS-over-HTTPS.**

> **Important:** Cloudflare's Deploy button currently requires a **public** GitHub or GitLab repository. This repository is private, so the button will not work for other users until the repository is made public. See [Cloudflare Deploy button documentation](https://developers.cloudflare.com/workers/platform/deploy-buttons/).

## Quick Deploy

1. Click **Deploy to Cloudflare** above and follow Cloudflare's setup flow.
2. Confirm the project uses `wrangler.toml` and the entry point `index.js`.
3. In the Worker's **Settings → Variables and Secrets**, add `UUID` with a valid UUID v4 value. Optionally add `PROXYIP`.
4. Deploy the Worker.
5. Test DNS-over-HTTPS at `https://YOUR-WORKER.workers.dev/dns-query`.

The unified Worker sends requests to `/dns-query` to the DoH resolver. Other paths are handled by the VPN worker in `worker.js`. The VPN configuration workspace is available at `https://YOUR-WORKER.workers.dev/YOUR-UUID`.

## Manual Deploy

```bash
git clone https://github.com/AmirShams-ir/CF-VPN.git
cd CF-VPN
npm install
npx wrangler login
npx wrangler deploy
```

---

* CloudFlare Worker VLESS [🐉](#advanced-config-generator-page)
* CloudFlare Tunneling Through [🗽](#tunneling-through)

for using this project better to use [**Advanced Mode**](#advanced-mode)

## Default Mode

* in default mode you should set **UUID** at `(Variables and Secrets) On Cloudflare`.

* for access Access to **[Advanced Config Generator]** use:    _your-Worker-Domain.dev_/**UUID**
* for access Access to [Default Subscription] use    _your-Worker-Domain.dev_/**sub**/**UUID**


## Advanced Mode

* **[Default UUID]**
  * by Generating Default UUID no need for set UUID in (Variables and Secrets)

* **[Access URLs]**
  * change access to **[Advanced Config Generator]** url
  * change access to **Subscription** url
 
* **(Variables and Secrets) On Cloudflare**
  * by default you should use **UUID** to set user-ID in (Variables and Secrets) if you changeing it you should use this new character
  * like **UUID**, by changeing **PROXYIP** you should use this new character in (Variables and Secrets)

## Fallback Page
There are 4 different HTML Game imbedded inside project (not load from other URL) it selected randomly based on UUID you choose.

**UUID Sample:** `11111111-1111-1111-1111-111111111111`

## [Advanced Config Generator] Page
![image](https://github.com/user-attachments/assets/a4f6d6b0-9614-4228-b0fc-0c0b4a70fbb2)

## Tunneling Through
▶️ **For static IP:** you can use X-UI, Hiddify config or get [free config](https://www.google.com/search?q=free+vless+vmess).

Limitation:
* ✅ **Supported Protocols:** VLESS, VMESS, and Trojan.
* ✅ **Supported Transmission:** WebSocket only.
* 🚫 **IP Addresses NOT Supported:**
  * Cloudflare does not support using an IP address as the server address.
  * To use an IP, consider _IP.sslip.io_ as a domain alternative.
* 🔒 **If using TLS**:
  * Ensure your domain is correctly pointed to your server and has an active SSL certificate.

![image](https://github.com/user-attachments/assets/519afb34-34e7-4979-8b21-9cc1ed2b1ebf)

## Thank`s
1. Thanks to the developers who wrote the [Cloudflare-Workers](https://github.com/topics/cloudflare-workers) core for vless proxy.
2. Thanks to [BPB Panel](https://github.com/bia-pain-bache/BPB-Worker-Panel) for develop technology and new ideas.

# DNS-Server

> **Fast • Secure • Lightweight • Multi-Upstream DNS-over-HTTPS Server powered by Cloudflare Workers**

A lightweight and production-ready DNS-over-HTTPS (DoH) server running entirely on Cloudflare Workers.

This project acts as a high-performance DNS proxy with support for multiple upstream providers, automatic failover, response caching, and low-latency request routing.

Designed for developers who need a reliable DoH endpoint without deploying traditional DNS infrastructure.

---

## ✨ Features

* ⚡ Ultra-fast DNS-over-HTTPS proxy
* 🌍 Multiple upstream DNS providers
* 🔄 Automatic failover
* 🚀 Lowest-latency upstream selection
* 💾 Built-in Cloudflare edge caching
* 📦 Lightweight serverless architecture
* 🔒 HTTPS only
* 🌐 Supports DNS Message and JSON APIs
* 🛠 Easy deployment with Cloudflare Workers
* 📄 Open source

---

## Supported Upstream Providers

The server can be configured to use one or more upstream DNS providers.

Examples include:

* Cloudflare DNS
* Google Public DNS
* Quad9
* NextDNS
* AdGuard DNS
* Mullvad DNS
* Control D

---

## Why this project?

Instead of exposing a single public resolver, this project forwards DNS queries to configurable upstream providers while taking advantage of Cloudflare's global edge network.

Benefits include:

* Lower latency
* Improved availability
* Better reliability
* Simple deployment
* No VPS required
* Free Cloudflare Worker tier supported

---

## Architecture

```
Client
   │
   ▼
Cloudflare Worker
   │
   ├── Cloudflare DNS
   ├── Google DNS
   ├── Quad9
   ├── NextDNS
   └── AdGuard
```

---

## Deployment

1. Clone the repository

```bash
git clone https://github.com/yourname/DNS-Server.git
```

2. Install dependencies

```bash
npm install
```

3. Login to Cloudflare

```bash
npx wrangler login
```

4. Deploy

```bash
npm run deploy
```

## Contributing

Contributions, bug reports, feature requests, and pull requests are always welcome.

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## License

This project is released under the Apache-2.0 License.
