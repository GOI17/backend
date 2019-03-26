import {Request, Response} from 'express';
import db from '../dbconnection';

class StationController {
    
    public async index(req: Request, res: Response) {
        const stations = await db.query('select * from station');
        res.json({code: 200, response: stations});
    }
    
    public async create(req: Request, res: Response) {
        await db.query('insert into station set ?', [req.body]);
        res.json({code: 200, response: "station saved"});
    }
    
    public async get(req: Request, res: Response) {
        const { id } = req.params;
        const station = await db.query('select * from station where id = ?', [id]);
        if(station.length > 0) return res.json({code: 200, response: station});
        if(station.length == 0) return res.status(404).json({code: 404, response: "Station doesnt exists"});
    }
    
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('delete from station where id = ?', [id]);
        res.json({code: 200, response: "station deleted"});
    }
    
    public async update(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('update station set ? where id = ?', [req.body, id]);
        res.json({code: 200, response: "station updated"});
    }
}

export const stationController = new StationController();
export default stationController;