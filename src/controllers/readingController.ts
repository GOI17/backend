import {Request, Response} from 'express';
import db from '../dbconnection';

class ReadingController {
    
    public async index(req: Request, res: Response) {
        const readings = await db.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings order by id desc');
        res.json({code: 200, response: readings});
    }

    public async getAll(req: Request, res: Response) {
        const { id } = req.params;
        const readings = await db.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings where idStation = ? order by id desc', [id]);
        res.json({code: 200, response: readings});
    }
    
    public async getLimit(req: Request, res: Response) {
        const { id } = req.params;
        const readings = await db.query('select id, date, idStation, temperature, humidity, windQuality, powder from readings where idStation = ? order by id desc limit 0, 15', [id]);
        res.json({code: 200, response: readings});
    }

    public async create(req: Request, res: Response) {
        await db.query('insert into readings set ?', [req.body]);
        res.json({code: 200, response: 'read inserted'});
    }
}

export const readingController = new ReadingController();
export default readingController;