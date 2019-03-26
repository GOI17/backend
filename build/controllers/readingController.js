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
class ReadingController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const readings = yield dbconnection_1.default.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings order by id desc');
            res.json({ code: 200, response: readings });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const readings = yield dbconnection_1.default.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings where idStation = ? order by id desc', [id]);
            res.json({ code: 200, response: readings });
        });
    }
    getLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const readings = yield dbconnection_1.default.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings where idStation = ? order by id desc limit 0, 15', [id]);
            res.json({ code: 200, response: readings });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbconnection_1.default.query('insert into readings set ?', [req.body]);
            res.json({ code: 200, response: 'read inserted' });
        });
    }
}
exports.readingController = new ReadingController();
exports.default = exports.readingController;
