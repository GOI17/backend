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
class SensorController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sensors = yield dbconnection_1.default.query('select * from sensors');
            res.json({ code: 200, response: sensors });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbconnection_1.default.query('insert into sensors set ?', [req.body]);
            res.json({ code: 200, response: "sensor saved" });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sensor = yield dbconnection_1.default.query('select * from sensors where id = ?', [id]);
            if (sensor.length > 0)
                return res.json({ code: 200, response: sensor });
            if (sensor.length == 0)
                return res.status(404).json({ code: 404, response: "Sensor doesnt exists" });
        });
    }
    getByStation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sensors = yield dbconnection_1.default.query('select * from sensors where idStation = ?', [id]);
            if (sensors.length > 0)
                return res.json({ code: 200, response: sensors });
            if (sensors.length == 0)
                return res.status(404).json({ code: 404, response: "Station does not have sensors" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield dbconnection_1.default.query('update sensors set ? where id = ?', [req.body, id]);
            res.json({ code: 200, response: "sensor updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield dbconnection_1.default.query('delete from sensors where id = ?', [id]);
            res.json({ code: 200, response: "sensor deleted" });
        });
    }
    deleteByStation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield dbconnection_1.default.query('delete from sensors where idStation = ?', [id]);
            res.json({ code: 200, response: "sensors deleted" });
        });
    }
}
exports.sensorController = new SensorController();
exports.default = exports.sensorController;
