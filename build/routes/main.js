"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainController_1 = __importDefault(require("../controllers/mainController"));
class Main {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mainController_1.default.index);
    }
}
const index = new Main();
exports.default = index.router;
