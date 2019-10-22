var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var db = require("../db/sqlite");
var formatHelper = require("../helpers/formatHelper");
var fetch = require("node-fetch");
function get(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var stmt = db.prepare("SELECT * FROM stations WHERE id = ?");
                    stmt.get(id, function (err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                    stmt.finalize();
                })];
        });
    });
}
exports.get = get;
function list() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    db.all("SELECT * FROM stations", function (err, rows) {
                        if (err)
                            reject(err);
                        else
                            resolve(rows);
                    });
                })];
        });
    });
}
exports.list = list;
function add(ip, name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var stmt = db.prepare("INSERT INTO stations (ip, name) VALUES (?, ?)");
                    stmt.get(ip, name, function (err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                    stmt.finalize();
                })];
        });
    });
}
exports.add = add;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var stmt = db.prepare("DELETE FROM stations WHERE id = ?");
                    stmt.get(id, function (err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                    stmt.finalize();
                })];
        });
    });
}
exports.remove = remove;
function register(ip, name) {
    return __awaiter(this, void 0, void 0, function () {
        var stationUrl, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!formatHelper.isValidIPv4(ip)) {
                        throw new Error("Invalid IPv4 address");
                    }
                    stationUrl = "http://" + ip;
                    return [4 /*yield*/, fetch(stationUrl + "/climactic-station-node")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("IP doesn't point to a valid station or station is not responding");
                    }
                    fetch(stationUrl + "/beep", { method: "POST" });
                    return [4 /*yield*/, add(ip, name)];
                case 2:
                    _a.sent();
                    fetch(stationUrl + "/dbeep", { method: "POST" });
                    return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function getUrl(ip) {
    return "http://" + ip;
}
function getData(stationId) {
    return __awaiter(this, void 0, void 0, function () {
        var station, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(stationId)];
                case 1:
                    station = _a.sent();
                    if (!station) {
                        throw new Error("Invalid station id");
                    }
                    return [4 /*yield*/, queryStation(station.ip, "/data")];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Unable to get data: " + response.statusText);
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getData = getData;
function queryStation(ip, path, method) {
    if (method === void 0) { method = "GET"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch("" + getUrl(ip) + path, { method: method })];
        });
    });
}
function beep(id, double) {
    return __awaiter(this, void 0, void 0, function () {
        var station, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(id)];
                case 1:
                    station = _a.sent();
                    if (!station) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, queryStation(station.ip, "/" + (double ? "d" : "") + "beep", "POST")];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    throw "Unable to beep device";
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.beep = beep;
function getStatus(ip) {
    return __awaiter(this, void 0, void 0, function () {
        var res, status_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, queryStation(ip, "/")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    status_1 = _a.sent();
                    return [2 /*return*/, {
                            online: true,
                            version: status_1.version
                        }];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, {
                            online: false,
                            version: null
                        }];
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
exports.getStatus = getStatus;
