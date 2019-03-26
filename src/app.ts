import express, { Application } from 'express'
import SocketIO from 'socket.io'
import { createServer, request } from 'http'
import main from './routes/main'
import stations from './routes/station'
import sensors from './routes/sensor'
import readings from './routes/reading'
import cors from 'cors'
import morgan from 'morgan'
import axios, { AxiosResponse } from 'axios'

class Server {

    public static readonly PORT: number = 3000
    private app: any
    private server: any
    private io: any
    private port: any

    constructor() {
        this.createApp()
        this.config()
        this.createServer()
        this.socket()
        this.routes()
        this.listen()
    }

    private createApp(): void {
        this.app = express()
    }

    private createServer(): void {
        this.server = createServer(this.app)
    }

    private config(): void {
        this.port = process.env.PORT || Server.PORT
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    private socket(): void {
        this.io = SocketIO(this.server)
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })

        this.io.on('connect', (socket: any) => {
            console.log(`Connected client on port ${this.port}`)
            this.receivedId(socket)
        })

        this.io.on('disconnect', (socket: any) => {
            console.log(`disconnected client on port ${this.port}`)
        })
    }

    private receivedId(socket: SocketIO.Server) {
        socket.on('chartId', (res: Response) => {
            if (res.ok) {
                let id = res.body
                console.log(id)
                this.getData(id)
            }
        })
    }

    private async getData(id: any) {
        const response = await axios.get(`http://localhost:3000/api/readings/limit/${id}`)
        this.updateData(response.data)
    }

    private updateData(data: AxiosResponse) {
        this.io.emit('chartData', data)
    }

    private routes(): void {
        this.app.use('/', main)
        this.app.use('/api/stations', stations)
        this.app.use('/api/readings', readings)
        this.app.use('/api/sensors', sensors)
    }

    public getApp(): Application {
        return this.app
    }

    public getSocket(): SocketIO.Socket {
        return this.io
    }

}

const server = new Server()
export default server

