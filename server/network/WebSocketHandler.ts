import * as WebSocket from "ws";

export default class WebSocketHandler {
  static instance: WebSocketHandler;

  server: WebSocket.Server;

  constructor(port = 8080) {
    this.server = new WebSocket.Server({
      port: port,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
      }
    });

    this.server.on("connection", function connection(ws) {
      // console.log("new connection", ws);
      // ws.on("message", function incoming(message) {
      //   console.log("received: %s", message);
      // });
      // ws.send(JSON.stringify({ event: "discover" }));
    });
  }

  static broadcastEvent(name: string, data?: any) {
    this.broadcast(JSON.stringify({ event: name, data: data }));
  }

  static broadcast(data) {
    this.instance.server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  static init(port = 8080) {
    this.instance = new WebSocketHandler(port);
  }
}
