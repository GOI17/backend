"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnection_1 = __importDefault(require("../dbconnection"));
class StationController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stations = yield dbconnection_1.default.query('select * from station');
            res.json({ code: 200, response: stations });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbconnection_1.default.query('insert into station set ?', [req.body]);
            res.json({ code: 200, response: "station saved" });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const station = yield dbconnection_1.default.query('select * from station where id = ?', [id]);
            if (station.length > 0)
                return res.json({ code: 200, response: station });
            if (station.length == 0)
                return res.status(404).json({ code: 404, response: "Station doesnt exists" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield dbconnection_1.default.query('delete from station where id = ?', [id]);
            res.json({ code: 200, response: "station deleted" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield dbconnection_1.default.query('update station set ? where id = ?', [req.body, id]);
            res.json({ code: 200, response: "station updated" });
        });
    }
}
exports.stationController = new StationController();
exports.default = exports.stationController;
