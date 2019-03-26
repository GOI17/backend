"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const readingController_1 = __importDefault(require("../controllers/readingController"));
class Reading {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', readingController_1.default.index);
        this.router.get('/:id', readingController_1.default.getAll);
        this.router.get('/limit/:id', readingController_1.default.getLimit);
        this.router.post('/', readingController_1.default.create);
    }
}
const index = new Reading();
exports.default = index.router;
