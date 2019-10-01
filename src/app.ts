import * as bodyParser from 'body-parser';
import express = require('express');
import * as core from "express-serve-static-core";
import {Index} from "./routes";

class App {
    public app: express.Application;
    public indexRoutes: Index = new Index();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.indexRoutes.routes(this.app);
    }
}

export default new App().app;
