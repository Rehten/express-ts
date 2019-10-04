import * as userController from './../controllers/user';
import * as express from 'express';

export class UserRoute {
    public routes(app: express.Application): void {
        app.route('/users').post(userController.addUser);
        app.route('/users/:userName').patch(userController.updateUser);
        app.route('/users/:userName').delete(userController.removeUser);
        app.route('/users/:userName').get(userController.getUser);
    }
}