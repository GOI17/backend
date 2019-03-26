import { Router } from 'express';
import stationController from '../controllers/stationController';

class Station {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', stationController.index);
        this.router.get('/:id', stationController.get);
        this.router.post('/', stationController.create);
        this.router.delete('/:id', stationController.delete);
        this.router.put('/:id', stationController.update);
    }
}

const station = new Station();
export default station.router;