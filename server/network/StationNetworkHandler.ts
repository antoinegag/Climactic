import { Socket, createSocket, RemoteInfo } from "dgram";
import { EventEmitter } from "events";
import { AddressInfo } from "net";
import StationManager from "../Station/StationManager";
import WebSocketHandler from "./WebSocketHandler";

const MESSAGES = {
  DISCOVERY_REQUEST: "D",
  REGISTERED_RESPONSE: "R"
};

export default class StationNetworkHandler extends EventEmitter {
  static instance: StationNetworkHandler;

  port: number;

  socket: Socket;

  get ip() {
    return this.socket.address() as AddressInfo;
  }

  constructor(port, broadcast = true) {
    super();

    this.port = port;
    this.socket = createSocket("udp4");
  }

  static async start(port, broadcast = true) {
    this.instance = new StationNetworkHandler(port, broadcast);
    return this.instance.start();
  }

  async start() {
    return new Promise((resolve, reject) => {
      this.socket.bind(this.port, undefined, () => {
        this.socket.setBroadcast(true);
      });

      this.socket.on("message", (message, rinfo) => {
        this.handleMessage(message, rinfo);
      });

      this.socket.on("listening", () => {
        resolve();
      });
    });
  }

  handleMessage(message: Buffer, rinfo: RemoteInfo) {
    // var output = "Udp server receive message : " + message + "\n";
    // process.stdout.write(output);

    const string = message.toString();

    switch (string) {
      case "D":
        this.handleDiscoverRequest(rinfo);
        break;

      default:
        break;
    }
  }

  async handleDiscoverRequest(rinfo: RemoteInfo) {
    // New station
    if (!(await StationManager.findByIP(rinfo.address))) {
      await StationManager.register(
        rinfo.address,
        `Unknown station ${StationManager.generateRandomTag()}`,
        false
      );
      WebSocketHandler.broadcastEvent("discover");
    }

    this.discoveryReply(rinfo);
  }

  discoveryReply(rinfo: RemoteInfo) {
    this.socket.send(
      MESSAGES.REGISTERED_RESPONSE,
      0,
      MESSAGES.REGISTERED_RESPONSE.length,
      rinfo.port,
      rinfo.address
    );
  }
}
