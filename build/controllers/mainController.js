"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    index(req, res) {
        res.json({ text: 'API Is /api/controllerName example: /api/stations' });
    }
}
exports.mainController = new MainController();
exports.default = exports.mainController;
