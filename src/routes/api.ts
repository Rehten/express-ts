import * as apiController from './../controllers/api';
import * as express from 'express';

export class APIRoute {
    public routes(app: express.Application): void {
        app.route('/api').get(apiController.getApi);
    }
}