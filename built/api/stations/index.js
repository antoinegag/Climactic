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
var _this = this;
var express = require("express");
var router = express.Router();
var stations = require("../../stations");
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var list, i, station, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, stations.list()];
            case 1:
                list = _b.sent();
                if (!list)
                    list = [];
                if (!req.query.status) return [3 /*break*/, 5];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < list.length)) return [3 /*break*/, 5];
                station = list[i];
                _a = list[i];
                return [4 /*yield*/, stations.getStatus(station.ip)];
            case 3:
                _a.status = _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, res.json(list)];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, station;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, stations.get(id)];
            case 1:
                station = _a.sent();
                if (station) {
                    return [2 /*return*/, res.json(station)];
                }
                res.status(404);
                return [2 /*return*/, res.json({ error: "No station found for id " + id })];
        }
    });
}); });
router.get("/:id/data", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, station, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, stations.get(id)];
            case 1:
                station = _c.sent();
                if (!station) return [3 /*break*/, 3];
                _b = (_a = res).json;
                return [4 /*yield*/, stations.getData(id)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 3:
                res.status(404);
                return [2 /*return*/, res.json({ error: "No station found for id " + id })];
        }
    });
}); });
router.post("/:id/beep", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, double, station, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                double = req.query.double;
                return [4 /*yield*/, stations.get(id)];
            case 1:
                station = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, stations.beep(id, double)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ error: null })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.json({ error: error_1.statusMessage })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, stations.remove(id)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ error: null })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.json({ error: error_2.statusMessage })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, ip, name, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, ip = _a.ip, name = _a.name;
                if (!ip || !name) {
                    res.status(400);
                    return [2 /*return*/, res.json({ error: "Missing paramters" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, stations.register(ip, name)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ error: null })];
            case 3:
                error_3 = _b.sent();
                res.status(500);
                return [2 /*return*/, res.json({ error: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
