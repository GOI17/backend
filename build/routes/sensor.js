"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sensorController_1 = __importDefault(require("../controllers/sensorController"));
class Sensor {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sensorController_1.default.index);
        this.router.get('/:id', sensorController_1.default.get);
        this.router.get('/station/:id', sensorController_1.default.getByStation);
        this.router.post('/', sensorController_1.default.create);
        this.router.put('/:id', sensorController_1.default.update);
        this.router.delete('/:id', sensorController_1.default.delete);
        this.router.delete('/station/:id', sensorController_1.default.deleteByStation);
    }
}
const sensor = new Sensor();
exports.default = sensor.router;
