import * as chai from 'chai';
import 'mocha';
import {Order} from "../../src/model/order";
import {OrderStatus} from "../../src/model/orderStatus";
import chaiHttp = require('chai-http');
import app from "../../src/app";

chai.use(chaiHttp);

const expect = chai.expect;

const order: Order = {
    id: 1,
    userId: 20,
    quantity: 1,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    complete: false
};

describe(`userRoute`, () => {
    it('should respond with HTTP 404 status because there is no order', async  () => {
        return chai.request(app).get(`/store/orders/${order.id}`).then(res => {
            expect(res.status).to.be.equal(404);
        });
    });

    it('should create a new order and retrieve it back', async () => {
        return chai.request(app).post(`/store/orders`).send(order).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body.userId).to.be.equal(order.userId);
            expect(res.body.status).to.be.equal(order.status);
        });
    });

    it('should remove an existing order', async () => {
        return chai.request(app).del(`/store/orders/${order.id}`).then(res => {
            expect(res.status).to.be.equal(204);
        });
    });

    it('should return 404 when it is trying to remove an order because the order does not exist', async () => {
        return chai.request(app).del(`/store/orders/${order.id}`).then(res => {
            expect(res.status).to.be.equal(404);
        });
    });
});
