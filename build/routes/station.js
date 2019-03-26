"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stationController_1 = __importDefault(require("../controllers/stationController"));
class Station {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', stationController_1.default.index);
        this.router.get('/:id', stationController_1.default.get);
        this.router.post('/', stationController_1.default.create);
        this.router.delete('/:id', stationController_1.default.delete);
        this.router.put('/:id', stationController_1.default.update);
    }
}
const station = new Station();
exports.default = station.router;
