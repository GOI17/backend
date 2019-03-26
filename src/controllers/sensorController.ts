import {Request, Response} from 'express';
import db from '../dbconnection';

class SensorController {

    public async index(req: Request, res: Response) {
        const sensors = await db.query('select * from sensors');
        res.json({code: 200, response: sensors});
    }

    public async create(req: Request, res: Response) {
        await db.query('insert into sensors set ?', [req.body]);
        res.json({code: 200, response: "sensor saved"});
    }

    public async get(req: Request, res: Response) {
        const { id } = req.params;
        const sensor = await db.query('select * from sensors where id = ?', [id]);
        if(sensor.length > 0) return res.json({code: 200, response: sensor});
        if(sensor.length == 0) return res.status(404).json({code: 404, response: "Sensor doesnt exists"});
    }

    public async getByStation(req: Request, res: Response) {
        const { id } = req.params;
        const sensors = await db.query('select * from sensors where idStation = ?', [id]);
        if(sensors.length > 0) return res.json({code: 200, response: sensors});
        if(sensors.length == 0) return res.status(404).json({code: 404, response: "Station does not have sensors"});
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('update sensors set ? where id = ?', [req.body, id]);
        res.json({code: 200, response: "sensor updated"});
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('delete from sensors where id = ?', [id]);
        res.json({code: 200, response: "sensor deleted"});
    }

    public async deleteByStation(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('delete from sensors where idStation = ?', [id]);
        res.json({code: 200, response: "sensors deleted"});
    }
}

export const sensorController = new SensorController();
export default sensorController;