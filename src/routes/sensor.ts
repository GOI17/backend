import { Router } from 'express';
import sensorController from '../controllers/sensorController';

class Sensor {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', sensorController.index);
        this.router.get('/:id', sensorController.get);
        this.router.get('/station/:id', sensorController.getByStation);
        this.router.post('/', sensorController.create);
        this.router.put('/:id', sensorController.update);
        this.router.delete('/:id', sensorController.delete);
        this.router.delete('/station/:id', sensorController.deleteByStation);
    }
}

const sensor = new Sensor();
export default sensor.router;