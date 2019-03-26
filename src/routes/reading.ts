import { Router } from 'express';
import readingController from '../controllers/readingController';

class Reading {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', readingController.index);
        this.router.get('/:id', readingController.getAll);
        this.router.get('/limit/:id', readingController.getLimit);
        this.router.post('/', readingController.create);
    }
}

const index = new Reading();
export default index.router;