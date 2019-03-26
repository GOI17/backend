import { Router } from 'express';
import mainController from '../controllers/mainController';

class Main {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', mainController.index);
    }
}

const index = new Main();
export default index.router;