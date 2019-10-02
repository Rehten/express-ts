import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import app from './../../src/app';
import User from './../../src/model/user';

chai.use(chaiHttp);

const expect = chai.expect;

const user: User = {
    id: Math.floor(Math.random() * 100) + 1,
    userName: 'John',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhon@myemail.com',
    password: 'password',
    phone: '5555555',
    userStatus: 1
};

describe('userRoute', () => {
    it('should respond with HTTP 404 status because there is no user', async () => {
        return chai.request(app).get(`/users/${user.userName}`).then(res => {
            expect(res.status).to.be.equal(404);
        });
    });

    it('should create a new user and retrieve it back', async () => {
        return chai.request(app).post('/users').send(user).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body.username).to.be.equal(user.userName);
        });
    });

    it('should updated the user Jhon', async () => {
        user.userName = 'John Updated';
        user.firstName = 'John Updated';
        user.lastName = 'Doe Updated';
        user.email = 'jhon@myemail_updated.com';
        user.password = 'password Updated';
        user.phone = '33333333';
        user.userStatus = 12;

        return chai.request(app).patch(`/users/John`).send(user).then(res => {
            expect(res.status).to.be.equal(204);
        });
    });

    it('should return the user updated on the step before', async () => {
        return chai.request(app).get(`users/${user.userName}`).then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body.userName).to.be.equal(user.userName);
            expect(res.body.firstName).to.be.equal(user.firstName);
            expect(res.body.lastName).to.be.equal(user.lastName);
        });
    });

    it('should return 404 because the user does not exist', async () => {
        user.firstName = 'Mary Jane';

        return chai.request(app).patch(`/users/Mary`).send(user).then(res => {
            expect(res.status).to.be.equal(404);
        });
    });

    it('should remove an existent user', async () => {
        return chai.request(app).del(`/user/${user.userName}`).then(res => {
            expect(res.status).to.be.equal(204);
        });
    });

    it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
        return chai.request(app).del(`/users/Mary`).then(res => {
            expect(res.status).to.be.equal(404);
        });
    });
});
