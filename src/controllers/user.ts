import User from "../model/user";
import {NextFunction, Request, Response} from "express";

let users: Array<User> = [{
    id: 1,
    userName: 'John',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhon@myemail.com',
    password: 'password',
    phone: '5555555',
    userStatus: 1
}];

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    const userName = req.params.userName;
    const user = users.find(obj => obj.userName === userName);
    const httpStatusCode = user ? 200 : 404;

    return res.status(httpStatusCode).send(user);
};

export let addUser = (req: Request, res: Response, next: NextFunction) => {
    const user: User = {
        id: Math.floor(Math.random() * 100) + 1,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userStatus: 1
    };

    users.push(user);

    return res.status(201).send(user);
};

export let updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userName = req.params.userName;
    const userIndex = users.findIndex(item => item.userName === userName);

    if (userIndex === -1) {
        return res.status(404).send();
    }

    {
        const user = users[userIndex];

        user.userName = req.body.userName;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phone = req.body.phone;
        user.userStatus = req.body.userStatus;
    }

    return res.status(204).send();
};

export let removeUser = (req: Request, res: Response, next: NextFunction) => {
    const userName = req.params.userName;
    const userIndex = users.findIndex(i => i.userName === userName);

    if (userIndex === -1) {
        return res.status(404).send();
    }

    users = users.filter(i => i.userName !== userName);

    return res.status(204).send();
};
