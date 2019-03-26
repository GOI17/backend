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
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = require("http");
const main_1 = __importDefault(require("./routes/main"));
const station_1 = __importDefault(require("./routes/station"));
const sensor_1 = __importDefault(require("./routes/sensor"));
const reading_1 = __importDefault(require("./routes/reading"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const axios_1 = __importDefault(require("axios"));
class Server {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.socket();
        this.routes();
        this.listen();
    }
    createApp() {
        this.app = express_1.default();
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || Server.PORT;
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    socket() {
        this.io = socket_io_1.default(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        });
        this.io.on('connect', (socket) => {
            console.log(`Connected client on port ${this.port}`);
            this.receivedId(socket);
        });
        this.io.on('disconnect', (socket) => {
            console.log(`disconnected client on port ${this.port}`);
        });
    }
    receivedId(socket) {
        socket.on('chartId', (res) => {
            if (res.ok) {
                let id = res.body;
                console.log(id);
                this.getData(id);
            }
        });
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`http://localhost:3000/api/readings/limit/${id}`);
            this.updateData(response.data);
        });
    }
    updateData(data) {
        this.io.emit('chartData', data);
    }
    routes() {
        this.app.use('/', main_1.default);
        this.app.use('/api/stations', station_1.default);
        this.app.use('/api/readings', reading_1.default);
        this.app.use('/api/sensors', sensor_1.default);
    }
    getApp() {
        return this.app;
    }
    getSocket() {
        return this.io;
    }
}
Server.PORT = 3000;
const server = new Server();
exports.default = server;
