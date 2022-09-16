import { Request, Response } from "express";

import * as userService from "../services/userService"

export async function signUpUser(req:Request, res: Response) {
    const {email, password, confirmPassword} = req.body;
    
    await userService.createUser({email, password, confirmPassword});

    res.sendStatus(201);
};

export async function signInUser(req:Request, res: Response) {
    const {email, password} = req.body;

    const token = await userService.login({email, password});

    res.status(200).send(token);
};