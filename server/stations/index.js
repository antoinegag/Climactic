const db = require("../db/sqlite");
const formatHelper = require("../helpers/formatHelper");
const fetch = require("node-fetch");

async function get(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM stations WHERE id = ?");
    stmt.get(id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.get = get;

async function list() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM stations", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
exports.list = list;

async function add(ip, name) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO stations (ip, name) VALUES (?, ?)");
    stmt.get(ip, name, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.add = add;

async function remove(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM stations WHERE id = ?");
    stmt.get(id, (err, result) => {
      if (err) reject(err);
      else resolve();
    });
    stmt.finalize();
  });
}
exports.remove = remove;

async function register(ip, name) {
  if (!formatHelper.isValidIPv4(ip)) {
    throw new Error("Invalid IPv4 address");
  }

  const stationUrl = `http://${ip}`;

  // Ping node to make sure it's actually a station
  const res = await fetch(`${stationUrl}/climactic-station-node`);
  if (!res.ok) {
    throw new Error(
      "IP doesn't point to a valid station or station is not responding"
    );
  }

  fetch(`${stationUrl}/beep`, { method: "POST" });

  await add(ip, name);

  fetch(`${stationUrl}/dbeep`, { method: "POST" });
}
exports.register = register;

function getUrl(station) {
  return `http://${station.ip}`;
}

async function getData(stationId) {
  const station = await get(stationId);

  if (!station) {
    throw new Error("Invalid station id");
  }

  const res = await fetch(`${getUrl(station)}/data`);

  if (!res.ok) {
    throw new Error(`Unable to get data: ${response.statusText}`);
  }

  return res.json();
}
exports.getData = getData;
