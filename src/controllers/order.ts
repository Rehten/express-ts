import {Order} from "../model/order";
import {NextFunction, Request, Response} from "express";
import {OrderStatus} from "../model/orderStatus";
import * as _ from 'lodash';

let orders: Array<Order> = [{
    id: 1,
    userId: 20,
    quantity: 1,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    complete: false
}];

export let getOrder = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const order = orders.find(obj => obj.id === Number(id));
    const httpStatusCode = order ? 200 : 404;

    return res.status(httpStatusCode).send(order);
};

export let addOrder = (req: Request, res: Response, next: NextFunction) => {
    const order: Order = {
        id: Math.floor(Math.random() * 100) + 1,
        userId: req.body.userId,
        quantity: req.body.quantity,
        shipDate: req.body.shipDate,
        status: OrderStatus.Placed,
        complete: false
    };

    orders.push(order);

    return res.status(201).send(order);
};

export let removeOrder = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const orderIndex = orders.findIndex(item => item.id === id);

    if (orderIndex === -1) {
        return res.status(404).send();
    }

    orders = orders.filter(item => item.id !== id);

    return res.status(204).send();
};

export let getInventory = (req: Request, res: Response, next: NextFunction) => {
    const grouppedOrders = _.groupBy(orders, 'userId');

    return res.status(200).send(grouppedOrders);
};
