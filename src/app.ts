import * as bodyParser from 'body-parser';
import express = require('express');
import * as core from "express-serve-static-core";
import {Index} from "./routes";
import {OrderRoute} from "./routes/order";
import {APIRoute} from "./routes/api";
import {UserRoute} from "./routes/user";

class App {
    public app: express.Application;
    public indexRoutes: Index = new Index();
    public orderRoutes: OrderRoute = new OrderRoute();
    public apiRoutes: APIRoute = new APIRoute();
    public userRoutes: Index = new UserRoute();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.indexRoutes.routes(this.app);
        this.orderRoutes.routes(this.app);
        this.apiRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
    }
}

export default new App().app;
