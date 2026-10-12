// <!--liMil-->Donate liMil: TDncy4ESqxsjL2fTv2fFauAnwah7EERrSt  ,  https://nowpayments.io/donation/limil <!--liMil-END-->.
// @ts-ignore

function MainConfig() {
  globalThis.uzerID = "12345678-1234-1234-1234567890ab";
  globalThis.qrexyIP = atob('Y2lwLnRyb25iYW5rLnNpdGU=');
}
function WebConfig() {
	globalThis.ThisVersion = "3.4.2";
	globalThis.AccessAdvancedConfig = globalThis.UzKey;
  globalThis.fpaths = "js,css,assets,wp-content,themes,app,cdn,jquery,live";
  globalThis.CleanIPDomain = "time.is";
}



export default {
	async fetch(request, env) {
		try {

			MainConfig();
			globalThis.UzKey = env.UUID || globalThis.uzerID;
			globalThis.CLxIP = env.PROXYIP || globalThis.qrexyIP;

			if (!isValidUUID(globalThis.UzKey))
				return new Response('Worker configuration error: UUID must be a valid UUID v4.', { status: 500 });

			const url = new URL(request.url);
			globalThis.pathName = url.pathname;
			WebConfig();

			// A valid UUID is required to open the private configuration workspace.
			if (globalThis.pathName === `/${globalThis.AccessAdvancedConfig}` &&
			    request.headers.get('Upgrade') !== 'websocket') {
				globalThis.hostName = request.headers.get('Host') || url.hostname;
				globalThis.GetPath = url.searchParams.get('path');
				globalThis.CnfgName = globalThis.hostName.split('.')[0];
				return await AdvancedConfig();
			}

			// Keep the landing page informational and public.
			if (globalThis.pathName === '/' && request.headers.get('Upgrade') !== 'websocket') {
				return await NetworkServicesHome();
			}

			if (globalThis.pathName.startsWith("/url-") &&
			    globalThis.pathName.startsWith("/url-" + globalThis.UzKey.split('-')[0] + "/")) {
				return await hTnlReq(request, globalThis.pathName.replace("/url-" + globalThis.UzKey.split('-')[0] + "/", ""));
			}

			const upgradeHeader = request.headers.get('Upgrade');
			if (upgradeHeader === 'websocket') {
				return await vOWSHandler(request);
			}

			return new Response('Not found', { status: 404 });
		} catch (err) {
			return new Response('Request could not be processed.', { status: 400 });
		}
	},
};
import { connect } from 'cloudflare:sockets';
async function vOWSHandler(request) {

	const webSocketPair = new WebSocketPair();
	const [client, webSocket] = Object.values(webSocketPair);

	webSocket.accept();

	let address = '';
	let portWithRandomLog = '';
	const log = (/** @type {string} */ info, /** @type {string | undefined} */ event) => {
		console.log(`[${address}:${portWithRandomLog}] ${info}`, event || '');
	};
	const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';

	const readableWebSocketStream = mkRdWSktStrm(webSocket, earlyDataHeader, log);
	let remoteSocketWapper = {
		value: null,
	};
	let udpStreamWrite = null;
	let isDns = false;

	readableWebSocketStream.pipeTo(new WritableStream({
		async write(chunk, controller) {
			if (isDns && udpStreamWrite) {
				return udpStreamWrite(chunk);
			}
			if (remoteSocketWapper.value) {
				const writer = remoteSocketWapper.value.writable.getWriter()
				await writer.write(chunk);
				writer.releaseLock();
				return;
			}

			const {
				hasError,
				message,
				portRemote = 443,
				addressRemote = '',
				rawDataIndex,
				vVvVersion = new Uint8Array([0, 0]),
				isUDP,
			} = prssVvHeader(chunk, globalThis.UzKey);
			address = addressRemote;
			portWithRandomLog = `${portRemote}--${Math.random()} ${isUDP ? 'udp ' : 'tcp '
				} `;
			if (hasError) {
				throw new Error(message);
				return;
			}
			if (isUDP) {
				if (portRemote === 53) {
					isDns = true;
				} else {
					throw new Error('UDP use only enable for DNS which is port 53');
					return;
				}
			}
			const vvResponseHeader = new Uint8Array([vVvVersion[0], 0]);
			const rawClientData = chunk.slice(rawDataIndex);

			if (isDns) {
				const { write } = await hUOBnd(webSocket, vvResponseHeader, log);
				udpStreamWrite = write;
				udpStreamWrite(rawClientData);
				return;
			}
			hTOBound(remoteSocketWapper, addressRemote, portRemote, rawClientData, webSocket, vvResponseHeader, log);
		},
		close() {
			//log(`readWbSktStrm is x`);
		},
		abort(reason) {
			//log(`readWbSktStrm is abrt`, JSON.stringify(reason));
		},
	})).catch((err) => {
		//log('readWbSktStrm piTo err', err);
	});

	return new Response(null, {
		status: 101,
		webSocket: client,
	});
}

async function hTOBound(remoteSocket, addressRemote, portRemote, rawClientData, webSocket, vvResponseHeader, log,) {
	async function connectAndWrite(address, port) {
	    if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address))
          address = `${atob("d3d3Lg==")}${address}${atob("LnNzbGlwLmlv")}`;
		const tcpSocket = connect({
			hostname: address,
			port: port,
		});
		remoteSocket.value = tcpSocket;
		//log(`connected to ${address}:${port}`);
		const writer = tcpSocket.writable.getWriter();
		await writer.write(rawClientData);
		writer.releaseLock();
		return tcpSocket;
	}

	async function retry() {
    const pnlPxIP = globalThis.pathName.split("/")[2];
    const pnlPxIPs = pnlPxIP ? atob(pnlPxIP).split(",") : void 0;
    const rmtPyIP = pnlPxIPs ? pnlPxIPs[Math.floor(Math.random() * pnlPxIPs.length)] : globalThis.CLxIP || addressRemote;

		const tcpSocket = await connectAndWrite(rmtPyIP, portRemote)
		tcpSocket.closed.catch(error => {
			//console.log('retry tcpSocket closed error', error);
		}).finally(() => {
			safeCloseWebSocket(webSocket);
		})
		rmtSkt2WS(tcpSocket, webSocket, vvResponseHeader, null, log);
	}

	const tcpSocket = await connectAndWrite(addressRemote, portRemote);

	rmtSkt2WS(tcpSocket, webSocket, vvResponseHeader, retry, log);
}


function mkRdWSktStrm(webSocketServer, earlyDataHeader, log) {
	let readableStreamCancel = false;
	const stream = new ReadableStream({
		start(controller) {
			webSocketServer.addEventListener('message', (event) => {
				if (readableStreamCancel) {
					return;
				}
				const message = event.data;
				controller.enqueue(message);
			});

			webSocketServer.addEventListener('close', () => {

				safeCloseWebSocket(webSocketServer);
				if (readableStreamCancel) {
					return;
				}
				controller.close();
			}
			);
			webSocketServer.addEventListener('error', (err) => {
				//log('webSocketServer has error');
				controller.error(err);
			}
			);
			const { earlyData, error } = base64ToArrayBuffer(earlyDataHeader);
			if (error) {
				controller.error(error);
			} else if (earlyData) {
				controller.enqueue(earlyData);
			}
		},

		pull(controller) {

		},
		cancel(reason) {

			if (readableStreamCancel) {
				return;
			}
			//log(`ReadableStream was canceled, due to ${reason}`)
			readableStreamCancel = true;
			safeCloseWebSocket(webSocketServer);
		}
	});

	return stream;

}

function prssVvHeader(vVvBuffer,UrKey) {
	if (vVvBuffer.byteLength < 24) {
		return {
			hasError: true,
			message: 'invalid data',
		};
	}
	const version = new Uint8Array(vVvBuffer.slice(0, 1));
	let isValidUser = false;
	let isUDP = false;
	if (stringify(new Uint8Array(vVvBuffer.slice(1, 17))) === UrKey) {
		isValidUser = true;
	}
	if (!isValidUser) {
		return {
			hasError: true,
			message: 'invalid user',
		};
	}

	const optLength = new Uint8Array(vVvBuffer.slice(17, 18))[0];

	const command = new Uint8Array(
		vVvBuffer.slice(18 + optLength, 18 + optLength + 1)
	)[0];

	if (command === 1) {
	} else if (command === 2) {
		isUDP = true;
	} else {
		return {
			hasError: true,
			message: `command ${command} is not support, command 01-tcp,02-udp,03-mux`,
		};
	}
	const portIndex = 18 + optLength + 1;
	const portBuffer = vVvBuffer.slice(portIndex, portIndex + 2);
	const portRemote = new DataView(portBuffer).getUint16(0);

	let addressIndex = portIndex + 2;
	const addressBuffer = new Uint8Array(
		vVvBuffer.slice(addressIndex, addressIndex + 1)
	);

	const addressType = addressBuffer[0];
	let addressLength = 0;
	let addressValueIndex = addressIndex + 1;
	let addressValue = '';
	switch (addressType) {
		case 1:
			addressLength = 4;
			addressValue = new Uint8Array(
				vVvBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			).join('.');
			break;
		case 2:
			addressLength = new Uint8Array(
				vVvBuffer.slice(addressValueIndex, addressValueIndex + 1)
			)[0];
			addressValueIndex += 1;
			addressValue = new TextDecoder().decode(
				vVvBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			);
			break;
		case 3:
			addressLength = 16;
			const dataView = new DataView(
				vVvBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			);
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				ipv6.push(dataView.getUint16(i * 2).toString(16));
			}
			addressValue = ipv6.join(':');
			break;
		default:
			return {
				hasError: true,
				message: `invild  addressType is ${addressType}`,
			};
	}
	if (!addressValue) {
		return {
			hasError: true,
			message: `addressValue is empty, addressType is ${addressType}`,
		};
	}

	return {
		hasError: false,
		addressRemote: addressValue,
		addressType,
		portRemote,
		rawDataIndex: addressValueIndex + addressLength,
		vVvVersion: version,
		isUDP,
	};
}



async function rmtSkt2WS(remoteSocket, webSocket, vvResponseHeader, retry, log) {
	let remoteChunkCount = 0;
	let chunks = [];
	let vVvHeader = vvResponseHeader;
	let hasIncomingData = false;
	await remoteSocket.readable
		.pipeTo(
			new WritableStream({
				start() {
				},

				async write(chunk, controller) {
					hasIncomingData = true;
					if (webSocket.readyState !== WS_READY_STATE_OPEN) {
						controller.error(
							'webSocket.readyState is not open, maybe close'
						);
					}
					if (vVvHeader) {
						webSocket.send(await new Blob([vVvHeader, chunk]).arrayBuffer());
						vVvHeader = null;
					} else {
						webSocket.send(chunk);
					}
				},
				close() {
					//log(`remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`);
				},
				abort(reason) {
					console.error(`rmtConct!.redbl X`, reason);
				},
			})
		)
		.catch((error) => {
			console.error(
				`rmtSkt2WS has exception `,
				error.stack || error
			);
			safeCloseWebSocket(webSocket);
		});

	if (hasIncomingData === false && retry) {
		//log(`retry`)
		retry();
	}
}

function base64ToArrayBuffer(base64Str) {
	if (!base64Str) {
		return { error: null };
	}
	try {
		base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
		const decode = atob(base64Str);
		const arryBuffer = Uint8Array.from(decode, (c) => c.charCodeAt(0));
		return { earlyData: arryBuffer.buffer, error: null };
	} catch (error) {
		return { error };
	}
}

function isValidUUID(uuid) {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

const WS_READY_STATE_OPEN = 1;
const WS_READY_STATE_CLOSING = 2;

function safeCloseWebSocket(socket) {
	try {
		if (socket.readyState === WS_READY_STATE_OPEN || socket.readyState === WS_READY_STATE_CLOSING) {
			socket.close();
		}
	} catch (error) {
		console.error('loadingLargeFile error', error);
	}
}

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
	byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
	return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
	const uuid = unsafeStringify(arr, offset);
	if (!isValidUUID(uuid)) {
		throw TypeError("Stringified UUID is invalid");
	}
	return uuid;
}

async function hUOBnd(webSocket, vvResponseHeader, log) {

	let isvVvHeaderSent = false;
	const transformStream = new TransformStream({
		start(controller) {

		},
		transform(chunk, controller) {

			for (let index = 0; index < chunk.byteLength;) {
				const lengthBuffer = chunk.slice(index, index + 2);
				const udpPakcetLength = new DataView(lengthBuffer).getUint16(0);
				const udpData = new Uint8Array(
					chunk.slice(index + 2, index + 2 + udpPakcetLength)
				);
				index = index + 2 + udpPakcetLength;
				controller.enqueue(udpData);
			}
		},
		flush(controller) {
		}
	});

	transformStream.readable.pipeTo(new WritableStream({
		async write(chunk) {
			const resp = await fetch('https://1.1.1.1/dns-query',
				{
					method: 'POST',
					headers: {
						'content-type': 'application/dns-message',
					},
					body: chunk,
				})
			const dnsQueryResult = await resp.arrayBuffer();
			const udpSize = dnsQueryResult.byteLength;
			const udpSizeBuffer = new Uint8Array([(udpSize >> 8) & 0xff, udpSize & 0xff]);
			if (webSocket.readyState === WS_READY_STATE_OPEN) {
				//log(`doh success and dns message length is ${udpSize}`);
				if (isvVvHeaderSent) {
					webSocket.send(await new Blob([udpSizeBuffer, dnsQueryResult]).arrayBuffer());
				} else {
					webSocket.send(await new Blob([vvResponseHeader, udpSizeBuffer, dnsQueryResult]).arrayBuffer());
					isvVvHeaderSent = true;
				}
			}
		}
	})).catch((error) => {
		//log('dns udp has error' + error)
	});

	const writer = transformStream.writable.getWriter();

	return {

		write(chunk) {
			writer.write(chunk);
		}
	};
}


async function hTnlReq(request, targetUrl) {
    const url = new URL(request.url);
    //let targetUrl = url.pathname.slice(1);
    if(targetUrl.startsWith("aHR0")){
        targetUrl = atob(targetUrl); 
    }
    try {
        new URL(targetUrl);
    } catch (e) {
        return new Response('Invalid URL provided.', { status: 400 });
    }

    const modifiedRequest = new Request(targetUrl + url.search, { 
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: request.redirect,
        credentials: request.credentials,
    });
    return await fetch(modifiedRequest);
}


async function resolveDNS(domain) {
  const dohURL2 = "https://cloudflare-dns.com/dns-query";
  const dohURLv4 = `${dohURL2}?name=${encodeURIComponent(domain)}&type=A`;
  const dohURLv6 = `${dohURL2}?name=${encodeURIComponent(domain)}&type=AAAA`;
  try {
    const [ipv4Response, ipv6Response] = await Promise.all([
      fetch(dohURLv4, { headers: { accept: "application/dns-json" } }),
      fetch(dohURLv6, { headers: { accept: "application/dns-json" } })
    ]);
    const ipv4Addresses = await ipv4Response.json();
    const ipv6Addresses = await ipv6Response.json();
    const ipv4 = ipv4Addresses.Answer ? ipv4Addresses.Answer.map((record) => record.data) : [];
    const ipv6 = ipv6Addresses.Answer ? ipv6Addresses.Answer.map((record) => record.data) : [];
    return { ipv4, ipv6 };
  } catch (error) {
    console.error("Error resolving DNS:", error);
    throw new Error(`An error occurred while resolving DNS - ${error}`);
  }
}

async function AdvancedConfig() {
  const pxipdomain = atob('Y2lwLnRyb25iYW5rLnNpdGU=');
  const dnsdomain1 = await resolveDNS(globalThis.hostName);
  const dnsdomain2 = await resolveDNS(globalThis.CleanIPDomain);
  const dnsdomain4 = [...dnsdomain1.ipv4, ...dnsdomain2.ipv4];
  const dnsdomain6 = [...dnsdomain1.ipv6, ...dnsdomain2.ipv6];  
  var TnlSecKey = "url-"+globalThis.UzKey.split('-')[0]+"/";
  var addresslist = "<datalist id='addresslist'><option value='"+globalThis.hostName+"'><option value='www.speedtest.net'>";
  for (var ip4 of dnsdomain4) {
    if(ip4.slice(-1) == "."){ip4 = ip4.substr(0,ip4.length - 1);}
    addresslist += "<option value='"+ip4+"'>";
  }
  for (var ip6 of dnsdomain6) {
    if(ip6.slice(-1) == "."){continue;}
    addresslist += "<option value='["+ip6+"]'>";
  }
  addresslist += "</datalist>";
	const AdvancedPage = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Advanced Config Generator</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        :root{--color:black;--primary-color:#09639f;--background-color:#fff;--container-background-color:#f9f9f9;--line-background-color:#f2f2f2;--text-color:#333;--border-color:#ddd}
        body,html{height:100%;margin:0}
        body{font-family:system-ui;background-color:var(--background-color);color:var(--text-color);display:flex;justify-content:center;align-items:start;}
        body.dark-mode{--color: white;--primary-color: #09639F;--background-color: #121212;--line-background-color: #252525;--container-background-color: #121212;--text-color: #DFDFDF;--border-color: #353535;}
        .container{background:var(--container-background-color);padding:20px;border:1px solid var(--border-color);border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,.1);width:90%;max-width:940px;margin: 10px 0;}
        .line,button{padding:10px}
        .line,textarea{border-radius:5px}
        h1,a{color:var(--primary-color);}

        .line{margin:15px 0;background-color:var(--line-background-color);font-family:monospace;font-size:1rem;word-wrap:break-word;line-height: 1.7rem;}
        .help{font-size:.8rem}
        textarea{margin:10px 0;width:98%;height:3.5rem}
        button{margin-top:15px;font-size:16px;font-weight:600;border:none;border-radius:5px;color:#fff;background-color:var(--primary-color);cursor:pointer;transition:background-color .3s}
        button:hover{background-color:#2980b9}
				label{display: inline-block;}
				#qrcode-container {display: none;place-content: space-around center;align-items: center;position: fixed;z-index: 1;width: 100%;height: 100%;background-color:#000000cc;}
				.qrcode{padding: 5px;border-radius: 5px;border: 1px solid var(--border-color);overflow: auto;}				h1,h2,h3{margin: 0;}
				input,select,textarea{padding:2px 5px;border:1px solid var(--border-color);border-radius:5px;font-size:14px;color:var(--text-color);background-color:var(--background-color);box-sizing:border-box;transition:border-color .5s}
				input[disabled]{background-color: var(--line-background-color);color: var(--background-color);border: 1px dashed var(--background-color);}
				.floating-button {position: fixed;bottom: 20px;left: 20px;background-color: var(--color);color:  #888;border: none;border-radius: 50%;width: 60px;height: 60px;font-size: 24px;cursor: pointer;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);transition: background-color 0.3s, transform 0.3s;}
        .floating-button:hover{transform:scale(1.1);}

            details { border-bottom: 1px solid var(--border-color);margin-bottom:10px;padding-bottom:10px;}
            summary {font-weight: bold;cursor: pointer;text-align: center;text-wrap: nowrap;}
            summary::marker { font-size: 1.5rem; color: var(--primary-color); }
            summary h2 { display: inline-flex; }
            .red, red {color:red;text-shadow: #000 0 0 0px;} 
            .green, green {color:#16c60c;text-shadow: #000 0 0 0px;}
      </style>
  </head>
  <body>
  <div class="container">
  <h1>Network Services · Edge Configuration</h1>
  <div class="line help">
 
    <b>Your IP</b> 
    @ 
    <b>Cloudflare:</b> <span id="clipdata">---</b></span>
    ||
    <b>Others:</b>  <span id="otipdata">---</span> 
    <button type="button" id="ipbtn" onclick="GetIPs();" style="margin: 0;padding: 3px 10px;">Get</button>
  </div>

  <details open>
   <summary><h2>Config</h2></summary> 

  <div class="line">
  <label for="address">Address: <input type="text" id="address" name="address" title="Config Address" placeholder="SubDomin.pages.dev" value="" onchange="chkaddress()"  list="addresslist"/></label>
  ${addresslist}
  |
  <label for="custom">Custom<input type="checkbox" id="custom" name="custom" onchange="cstm()"></label>
  <label for="host">Host: <input type="text" id="host" name="host" title="Config Host" placeholder="" value="" disabled /></label>
  <label for="sni">SNI: <input type="text" id="sni" name="sni" title="Config SNI" placeholder="" value="" disabled /></label>
  </div>
  <div class="line">
  <label for="pxip">${atob('UHJveHlJUA')}: <input type="text" id="pxip" name="pxip" title="" placeholder="" value="" list="pxiplist"/></label>
  <datalist id="pxiplist">
    <option value="${pxipdomain}">
    <option value="${atob('YnBiLnlvdXNlZi5pc2VnYXJvLmNvbQ==')}">
    <option value="${atob('cHJveHlpcC5hbWNsdWJzLmtvem93LmNvbQ==')}">
    <option value="${atob('cHJveHlpcC5meHhrLmRlZHluLmlv')}">
  </datalist>
  Choose IP from <a target="_blank" href="https://www.nslookup.io/domains/${pxipdomain}/dns-records/">${pxipdomain}</a>
  </div>
  <div class="help">
  <b>${atob('UHJveHlJUA')} Notice</b>
  <br />
  * you can use multiple IP separate with comma (,) like  [ <i>141.148.187.195</i><b>,</b><i>129.146.46.164</i> ]. system will choose one randomly for every request.
  <br />
  * you can use domain directly like [ <i>${pxipdomain}</i> ].
  <br />
  * this IP will use just on servers and sites using Cloudflare. for other site like (youtube) system use random ip and cant change.
  </div>
  <div class="line">

  <label for="port">Port:
  <select id="port" title="" name="port" onchange="">
    <option value="443" selected="selected">443</option>
    <option value="8443">8443</option>
    <option value="2053">2053</option>
    <option value="2083">2083</option>
    <option value="2087">2087</option>
    <option value="2096">2096</option>
  </select>
  </label>

  <label for="fingerprint">FingerPrint:
  <select id="fingerprint" title="" name="fingerprint" onchange="">
    <option value="chrome" selected="selected">Chrome</option>
    <option value="firefox">FireFox</option>
    <option value="safari">Safari</option>
    <option value="ios">iOS</option>
    <option value="android">Android</option>
    <option value="edge">Edge</option>
    <option value="Randomized">randomized</option>
    <option value="0">   </option>
  </select>
  </label>

  </div>
  <div class="line">
  <button type="button" id="generate" onclick="generate()">Generate</button>
  <button type="button" id="copy" onclick="copyToClipboard('config')">Copy Config</button>
  <button type="button" id="qrconfig" onclick="openQR('config')">QR Code</button>
  <br />
  <textarea id="config"></textarea>
  </div>
   </details>


  <details>
   <summary><h2>Tunneling Through</h2></summary> 
  <div class="line">

  <label for="tnlconfig" style="width:100%">Config: <input type="text" id="tnlconfig" name="tnlconfig" title="Remote Config" placeholder="${atob('dmxlc3M=')}://..." value="" style="width:90%"/></label>
  </div>

  <div class="help">

  ▶️ <b>For static IP:</b> you can use X-UI, Hiddify config or get <a href="https://www.google.com/search?q=free+${atob('dmxlc3M=')}+${atob('dm1lc3M=')}" target="_blank">free config</a>.
<br><br>
  <h3>Limitation:</h3>
  <ul>
    <li>
        ✅ <b>Supported Protocols:</b> <green>${atob('VkxFU1M=')}</green>, <green>${atob('Vk1FU1M=')}</green>, and <green>${atob('VHJvamFu')}</green>.
    </li><li>
        ✅ <b>Supported Transmission:</b> <green>WebSocket</green> only.
    </li><li> 
        🚫 <b>IP Addresses <red>NOT</red> Supported:</b>
        <ul><li>         
            Cloudflare does not support using an IP address as the server address.
          </li><li> 
            To use an IP, consider <b>IP.sslip.io</b> as a domain alternative.
        </li></ul> 
        
    </li><li> 
        🔒 <b>If using TLS:</b>
        <ul><li>
            Ensure your domain is correctly pointed to your server and has an active SSL certificate.
        </li></ul> 
    </li> 
  </ul>
  </div>


  <div class="line">
  <button type="button" id="tnlcnfgenerate" onclick="tnlcnfgenerate()">ReConfig</button>
  <button type="button" id="tnlcnfcopy" onclick="copyToClipboard('tnlreconfig')">Copy</button>
  <button type="button" id="tnlcnfqrconfig" onclick="openQR('tnlreconfig')">QR Code</button>
  <br />
  <textarea id="tnlreconfig"></textarea>

  <div class="help" id="tnlhelp"></div>
  </div>
  
 </details>


  <div class="help"><center>Network Services · Edge Configuration Workspace</center></div>

  </div>

  <div id="qrcode-container" onclick="closeQR()"></div>
  <button id="darkModeToggle" class="floating-button">🌎</button>
  <script>
  let defalt_address = "${globalThis.hostName}";
  let defalt_pxip = "${globalThis.CLxIP}";
  let defalt_uuid = "${globalThis.UzKey}";
  let defalt_CnfgName = "${globalThis.CnfgName}";  

  const fpathss = "${globalThis.fpaths}";
  const fpath = fpathss.split(',');              
  localStorage.getItem('darkMode') === 'enabled' && document.body.classList.add('dark-mode'); 
var address = document.getElementById("address");
var custom = document.getElementById("custom");
var host = document.getElementById("host");
var sni = document.getElementById("sni");
var pxip = document.getElementById("pxip");
var port = document.getElementById("port");
var fingerprint = document.getElementById("fingerprint");
var config = document.getElementById("config");
const darkModeToggle = document.getElementById('darkModeToggle'); 
function load_defalt(){
	address.value = defalt_address;
	host.value = defalt_address;
	sni.value = defalt_address;
	pxip.value = defalt_pxip;
	GetIPs();
	darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
		darkModeToggle.innerHTML = (isDarkMode ? '🌞' : '🌙');
  });
  GetLocalStorage();
  DetailsBoxShow();
}
function cstm(){
    if(custom.checked){
       host.disabled = "";
       sni.disabled = "";
    }else{
        host.disabled = "disabled";
       sni.disabled = "disabled";
    }
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).value;  //textContent
    navigator.clipboard.writeText(textToCopy)
         .then(() => alert('Config copied to clipboard!'))
         .catch(err => console.error('Failed to copy text:', err));
}

function chkaddress(){
    if (address.value !== defalt_address){
    	 custom.checked = true;
    }else{
    	 custom.checked = false;
    }
    cstm();
}
function generate(){
    var caddress = address.value;
    var cport = port.value;
    var cfingerprint = '';
    var chost = '';
    var csni = '';
    var cpath = '%3Fed%3D2048';


    if(custom.checked){
    	chost = "&host="+host.value;
    	csni = "&sni="+sni.value;
    }
    if(fingerprint.value != 0){
    	cfingerprint =  "&fp="+fingerprint.value;
    }
    if (pxip.value && pxip.value !== defalt_pxip){                                               
        var pxipath = (btoa(pxip.value.replace(/ /g, ''))).replace(/=/g, '%3D');
    	cpath = fpath[Math.floor(Math.random() * fpath.length)]+"%2F"+pxipath+"%2F%3Fed%3D2048";
    } 
                                                                                   

config.value = atob("dmxlc3M=")+"://"+defalt_uuid+"@"+caddress+":"+cport+"?encryption=none&security=tls"+chost+""+cfingerprint+"&alpn=h2%2Chttp%2F1.1&type=ws"+csni+"&path=%2F"+cpath+"#%F0%9F%90%B2%20"+defalt_CnfgName;
}

  const closeQR = () => {
          	 let qrcodeContainer = document.getElementById("qrcode-container");
          	 qrcodeContainer.style.display = "none";
          	 qrcodeContainer.innerHTML = "";
  }
  const openQR = (id) => {
            let url = document.getElementById(id).value;
            if(!url){return;}
            let qrcodeContainer = document.getElementById("qrcode-container");
            qrcodeContainer.innerHTML = "";
            qrcodeContainer.style.display = "flex";
            let qrcodeDiv = document.createElement("div");
            qrcodeDiv.className = "qrcode";
            qrcodeDiv.style.backgroundColor = "#ffffff";
            new QRCode(qrcodeDiv, {
                text: url,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            qrcodeContainer.appendChild(qrcodeDiv);
   }

   const GetIPs = async () => {
    document.getElementById('otipdata').innerHTML = document.getElementById('clipdata').innerHTML = '---';
    const ipResponse = await fetch('https://ipwho.is/' + '?nocache=' + Date.now(), { cache: "no-store" });
    const ipResponseObj = await ipResponse.json();
    var ipdataun = ipResponseObj.ip + '  <b>'+ipResponseObj.country+' ('+ipResponseObj.country_code+') </b>';
    document.getElementById('otipdata').innerHTML = ipdataun;

    const cfIPresponse = await fetch('https://ipv4.icanhazip.com/?nocache=' + Date.now(), { cache: "no-store" });
    const cfIP = await cfIPresponse.text();
    const cfResponse = await fetch('https://ipwho.is/' + cfIP + '?nocache=' + Date.now(), { cache: "no-store" });
    const cfResponseObj = await cfResponse.json();
    var ipdatacf = cfIP + '  <b>'+cfResponseObj.country+' ('+cfResponseObj.country_code+') </b>';
    document.getElementById('clipdata').innerHTML = ipdatacf; //parse

  }

///////////////////////////////////////////////////////////
// Tnl-Config ////////////////////////////////////////////

    var defalt_tnlsec = "${TnlSecKey}"; 
    var tnlconfig = document.getElementById("tnlconfig");
    var tnlreconfig = document.getElementById("tnlreconfig");
    var tnlhelp = document.getElementById("tnlhelp");
    var tnlPreName = "🗽 Tnl🞂 ";
    async function tnlcnfgenerate(){
        let VlConfig = {};
        let TnlError = {};
        var ConfigMode;

        if(!tnlconfig.value){return;}
        if(tnlconfig.value.startsWith("${atob('dmxlc3M=')}") || tnlconfig.value.startsWith("${atob('dHJvamFu')}") ){
           VlConfig = GetVlConfig(tnlconfig.value);
           ConfigMode = "vl";
        }else if(tnlconfig.value.startsWith("${atob('dm1lc3M=')}")){
           VlConfig = GetVmConfig(tnlconfig.value);
           ConfigMode = "vm";
        }else{
            alert("⚠️ Supported Protocols: ${atob('VkxFU1M=')}, ${atob('Vk1FU1M=')}, and ${atob('VHJvamFu')}.");
        }

        VlConfig.base.sni = VlConfig.base.sni ? VlConfig.base.sni.toLowerCase() : "";
        VlConfig.base.host = VlConfig.base.host ? VlConfig.base.sni.toLowerCase() : "";

        if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(VlConfig.base.address)){
             VlConfig.base.address = VlConfig.base.address+atob("LnNzbGlwLmlv");
             TnlError.address_is_ip = true;
        }else{
            if(VlConfig.base.sni && (VlConfig.base.address !== VlConfig.base.sni)){TnlError.address_not_sni = true;}
        }

        var new_path_http = "http";
        if(VlConfig.base.security){if(VlConfig.base.security == "tls"){new_path_http = "https";TnlError.security_is_tls = true;}}
        var new_path_path = VlConfig.base.path ? VlConfig.base.path : "/";
        VlConfig.base.path = "/"+defalt_tnlsec+btoa(new_path_http+"://"+VlConfig.base.address+":"+VlConfig.base.port+new_path_path);//
        if(TnlError.security_is_tls && (TnlError.address_is_ip || TnlError.address_not_sni)){
            var new_path_sni = "/"+defalt_tnlsec+btoa(new_path_http+"://"+VlConfig.base.sni+":"+VlConfig.base.port+new_path_path);
        }
        if(VlConfig.base.type !== "ws"){TnlError.type_not_ws = true;}

        var active_address = VlConfig.base.sni || VlConfig.base.host || VlConfig.base.address;
          if(active_address == defalt_address || active_address.includes(defalt_address)){TnlError.config_is_self = true;}
        if(new_path_path.includes(defalt_tnlsec)){TnlError.config_is_selftnl = true;}
        if(active_address.includes("pages.dev") || active_address.includes("workers.dev") ){TnlError.config_is_worker = true;}

        var TnlIsGood = SetTnlNotice(TnlError, VlConfig);
        if(!TnlIsGood){return;}

        var NewTnlConfig;
        tnlreconfig.value = "";
        if((TnlError.address_is_ip && !VlConfig.base.sni) || (!TnlError.address_is_ip)){
          tnlreconfig.value += SetConfig(ConfigMode, VlConfig)+"\\n";
        }
        if(new_path_sni){
          VlConfig.base.path = new_path_sni;
          tnlreconfig.value += SetConfig(ConfigMode, VlConfig)+"\\n";
        }
        
       localStorage.setItem(tnlconfig.id, tnlconfig.value); 
    }
    function SetConfig(ConfigMode, VlConfig){
        if(ConfigMode == "vl"){
            return SetVlConfig(VlConfig);
        }else if(ConfigMode == "vm"){ 
            return SetVmConfig(VlConfig);
        }
    }
    function SetTnlNotice(TnlError, VlConfig){
      var NewError = "";
        if(TnlError.config_is_selftnl){
            alert("⚠️ Do NOT use Tnl inside itself ! ☠️");
            return false;
        }
        if(TnlError.config_is_self){
            alert("⚠️ Do NOT use my config for Tnl ! 😱");
            return false;
        }
 

        tnlhelp.innerHTML = "<h3>Notice:</h3>"; 

        if(TnlError.type_not_ws){
            tnlhelp.innerHTML += "⚠️ <b>Config Transmission is NOT <red>WebSocket</red></b>, Tnl-config is unlikely to work.<br/>";
        }
        if(VlConfig.base.security == "reality"){
            tnlhelp.innerHTML += "⚠️ <b>Config Security is <red>reality</red></b>, Tnl-config is unlikely to work.<br/>";
        }
        if(TnlError.address_is_ip){
          if(TnlError.security_is_tls && VlConfig.base.sni){
            tnlhelp.innerHTML += "⚠️ <b>Config has an IP as address</b>, so we use SNI (<a href='http://"+VlConfig.base.sni+"' target='_blank'>"+VlConfig.base.sni+"</a>) as config address.<br/>";
          }else{
            tnlhelp.innerHTML += "⚠️ <b>Config has an IP as address</b>, so we use <a href='http://"+VlConfig.base.address+"' target='_blank'>"+VlConfig.base.address+"</a> as a domain alternative.<br/>";  
              if(TnlError.security_is_tls){
                tnlhelp.innerHTML += "⚠️ <b>Config use TLS</b>, get an active SSL certificate for "+VlConfig.base.address+".<br/>";
              }                     
          }

        }else{
            if(TnlError.security_is_tls && TnlError.address_not_sni){
                tnlhelp.innerHTML += "⚠️ <b>The sni config is different from the address</b>, two Tnl-config generated: one use address ("+VlConfig.base.address+") second use SNI ("+VlConfig.base.sni+").<br/>"; 
            }
        }
        if(TnlError.config_is_worker){
          tnlhelp.innerHTML += "⚠️ <b>It is not recommended to use <red>CL-Worker</red> configurations</b>.<br/>"; 
        } 

        tnlhelp.innerHTML += "<green>🗽 Tnl-Config generated successfully.</green>";
        
        
      return true;
    }

    function SetVmConfig(SetConfig){
       var NewConfig;


       SetConfig.data.path = SetConfig.base.path;
       SetConfig.data.sni = SetConfig.data.host = SetConfig.data.add = defalt_address;
       SetConfig.data.port = "443";
       SetConfig.data.ps = unescape(encodeURIComponent(tnlPreName))+SetConfig.base.name;
       if(SetConfig.data.security !== "tls"){
          SetConfig.data.tls = "tls";
          SetConfig.data.fp = "chrome";
          SetConfig.data.alpn = "http/1.1";
       }

       
       NewConfig = SetConfig.base.protocol+"://"+btoa(JSON.stringify(SetConfig.data));


       return NewConfig;       
    }

    function SetVlConfig(SetConfig){
       var NewConfig;
       var NewDataConfig = "";
       SetConfig.data.path = SetConfig.base.path;
       SetConfig.data.sni = SetConfig.data.host = defalt_address;
       if(SetConfig.data.security !== "tls"){
          SetConfig.data.allowInsecure = "1";
          SetConfig.data.fp = "chrome";
          SetConfig.data.alpn = "http/1.1";
       }
       SetConfig.data.security = "tls";

       Object.keys(SetConfig.data).forEach(key => { NewDataConfig += key+"="+encodeURIComponent(SetConfig.data[key])+"&"; });
       NewDataConfig = NewDataConfig.substr(0,NewDataConfig.length-1);

       NewConfig = SetConfig.base.protocol+"://"+SetConfig.base.id+"@"+defalt_address+":443?"+NewDataConfig+"#"+encodeURIComponent(tnlPreName+SetConfig.base.name);

       return NewConfig;
    }

    function GetVmConfig(getconfig){
      let setconfig = {};
        if(!getconfig.startsWith("${atob('dm1lc3M=')}://")){return false;}
        getconfig = getconfig.replaceAll("${atob('dm1lc3M=')}://","");
        getconfig = atob(getconfig);
        
        //setconfig  = JSON.parse(getconfig);
        let setdata = JSON.parse(getconfig);

        setconfig.protocol = "${atob('dm1lc3M=')}";
        setconfig.address = setdata.add; 
        setconfig.security = setdata.tls  ? setdata.tls : null; 
        setconfig.name = setdata.ps  ? setdata.ps : null; 
        setconfig.type = setdata.net ? setdata.net : null;

      return { "base":{...setdata,...setconfig}, "data":setdata};
    }


    function GetVlConfig(getconfig){
      let setconfig = {};
        setconfig.name = getconfig.includes("#") ? decodeURIComponent(getconfig.match(/#([^#]*)/)[1]) : null;
      
        setconfig.protocol = getconfig.match(/(.*?):\\/\\//)[1]; //protocol  ["protocol"]
        setconfig.id = getconfig.match(/\\:\\/\\/(.*?)\\@/)[1];
        setconfig.address = getconfig.match(/@([a-z0-9.-]{2,}):/)[1];
        setconfig.port = getconfig.match(/:([0-9]{2,})\\?/)[1];

        if(!getconfig.includes("#")){getconfig += "#";}
        if(getconfig.includes("%22")){getconfig = getconfig.replaceAll("%22","%27");}
        let setdata = JSON.parse(decodeURIComponent('{ "'+getconfig.replaceAll('&','","').replaceAll('=','":"').match(/\\?(.*?)#/)[1]+'" }'));

        return { "base":{...setconfig,...setdata}, "data":setdata};
    }

    function GetLocalStorage(){
      if (localStorage.length > 0) {
        Object.keys(localStorage).forEach(key => {
          if(document.getElementById(key))
          document.getElementById(key).value = localStorage.getItem(key);
        });
      }
      
    }

    function DetailsBoxShow(){    
            const detailsElements = document.querySelectorAll("details");
            detailsElements.forEach((details, index) => {
                const savedState = localStorage.getItem("fi_detailsBox-" + index);
                if (savedState === "closed") {
                    details.open = false;
                } else {
                    details.open = true;
                }
                details.addEventListener("toggle", function () {
                    localStorage.setItem("fi_detailsBox-" + index, details.open ? "open" : "closed");
                });
            });
    }
load_defalt();
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  </body>
  </html>`;
	return new Response(AdvancedPage, {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, no-transform",
      "CDN-Cache-Control": "no-store"
    }
  });
}

async function NetworkServicesHome() {
  const page = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Network engineering, edge connectivity architecture, and configuration tooling.">
<title>Network Services | Edge Connectivity</title>
<style>
:root{color-scheme:dark;--bg:#0b1220;--panel:#111c2e;--line:#263752;--muted:#9fb0c7;--accent:#68d4c5;--text:#edf4ff}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(900px 500px at 80% -15%,#193b53 0,transparent 60%),var(--bg);color:var(--text);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}
.wrap{width:min(1100px,92%);margin:auto}.nav{display:flex;align-items:center;justify-content:space-between;padding:24px 0;border-bottom:1px solid var(--line)}.brand{font-weight:800;letter-spacing:.04em}.brand span{color:var(--accent)}.pill{border:1px solid var(--line);padding:6px 12px;border-radius:99px;color:var(--muted);font-size:.85rem}
.hero{padding:76px 0 56px;max-width:800px}.eyebrow{color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.78rem}.hero h1{font-size:clamp(2.5rem,6vw,4.7rem);line-height:1.05;margin:16px 0 20px;letter-spacing:-.04em}.hero p{font-size:1.15rem;color:var(--muted);max-width:680px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.btn{display:inline-block;text-decoration:none;border-radius:10px;padding:12px 18px;font-weight:700}.primary{background:var(--accent);color:#09201f}.secondary{border:1px solid var(--line);color:var(--text)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;padding:20px 0 60px}.card{background:linear-gradient(150deg,#142239,var(--panel));border:1px solid var(--line);border-radius:16px;padding:24px}.num{color:var(--accent);font-weight:800;font-size:.84rem}.card h2{font-size:1.2rem;margin:10px 0}.card p{color:var(--muted);margin:0}.foot{border-top:1px solid var(--line);padding:22px 0 36px;color:var(--muted);font-size:.9rem;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
</style></head><body><div class="wrap">
<header class="nav"><div class="brand">EDGE<span>/</span>NETWORK</div><div class="pill">Network engineering services</div></header>
<main><section class="hero"><div class="eyebrow">Connectivity • Architecture • Tooling</div><h1>Network systems, thoughtfully engineered.</h1><p>We build practical network configuration tools and edge-connectivity workflows, with an emphasis on clear parameters, reproducible profiles, and maintainable infrastructure.</p><div class="actions"><a class="btn primary" href="#">Open Configuration Workspace</a><a class="btn secondary" href="#">Explore services</a></div></section>
<section id="services" class="grid"><article class="card"><div class="num">01 / DESIGN</div><h2>Edge Connectivity</h2><p>Architecture and configuration design for modern edge and serverless connectivity.</p></article>
<article class="card"><div class="num">02 / CONFIGURATION</div><h2>Protocol Profiles</h2><p>Parameter-driven configuration workflows with structured, repeatable outputs.</p></article>
<article class="card"><div class="num">03 / ENGINEERING</div><h2>Network Tooling</h2><p>Utilities for organizing connection settings and preparing profiles for external testing.</p></article></section></main>
<footer class="foot"><span>Network Services · Edge Connectivity</span><span>Configuration tools for engineering workflows</span></footer></div></body></html>`;
  return new Response(page, {status:200,headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"no-store"}});
}
