import { Request, Response } from 'express';

class MainController {

    public index(req: Request, res: Response) {
        res.json({ text: 'API Is /api/controllerName example: /api/stations' });
    }
}

export const mainController = new MainController();
export default mainController;