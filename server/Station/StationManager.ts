const db = require("../db/sqlite");
import Station from "./Station";
import StationInput from "./StationInput";
import { isValidIPv4 } from "../helpers/formatHelper";
const formatHelper = require("../helpers/formatHelper");
const nfetch = require("node-fetch");

interface StationEntry {
  id: number;
  ip: string;
  name: string;
}

function create(entry: StationEntry) {
  return new Station(entry.id, entry.ip, entry.name);
}

export default class StationManager {
  static async get(id: number): Promise<Station> {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("SELECT * FROM stations WHERE id = ?");
      stmt.get(id, (err, result: StationEntry) => {
        if (err) {
          reject(err);
        } else {
          resolve(create(result));
        }
      });
      stmt.finalize();
    });
  }

  public static async list(): Promise<Array<Station>> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM stations", (err, rows: Array<StationEntry>) => {
        if (err) reject(err);
        else {
          resolve(rows.map(row => create(row)));
        }
      });
    });
  }

  static async rename(id: number, name: string) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("UPDATE stations SET name = ? WHERE id = ?");
      stmt.run(name, id, function(err, result) {
        if (err) reject(err);
        else {
          resolve(StationManager.get(id));
        }
      });
      stmt.finalize();
    });
  }

  static async updateIp(id: number, ip: string) {
    if (!ip.startsWith("localhost") && !isValidIPv4(ip)) {
      throw new Error("Invalid IP");
    }
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("UPDATE stations SET ip = ? WHERE id = ?");
      stmt.run(ip, id, function(err, result) {
        if (err) reject(err);
        else {
          resolve(StationManager.get(id));
        }
      });
      stmt.finalize();
    });
  }

  static async add(ip: string, name: string) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("INSERT INTO stations (ip, name) VALUES (?, ?)");
      stmt.run(ip, name, function(err, result: StationEntry) {
        if (err) reject(err);
        else {
          // @ts-ignore
          resolve(create({ id: this.lastID, ip, name }));
        }
      });
      stmt.finalize();
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM stations WHERE id = ?");
      stmt.run(id, (err, result) => {
        if (err) reject(err);
        else resolve();
      });
      stmt.finalize();
    });
  }

  static async register(ip: string, name: string) {
    if (!ip.startsWith("localhost") && !formatHelper.isValidIPv4(ip)) {
      throw new Error("Invalid IPv4 address");
    }

    const stationUrl = `http://${ip}`;

    // Ping node to make sure it's actually a station
    let res;
    try {
      res = await nfetch(`${stationUrl}/climactic-station-node`);
    } catch (error) {
      throw new Error("Unable to reach host");
    }

    if (!res.ok) {
      throw new Error(
        "IP doesn't point to a valid station or station is not responding"
      );
    }

    await nfetch(`${stationUrl}/beep`, { method: "POST" });

    return StationManager.add(ip, name);
  }
}
