import { Request, Response } from "express";

import * as authService from "../services/authService"

export async function signUpUser(req:Request, res: Response) {
    const {email, password, confirmPassword} = req.body;
    await authService.createUser({email, password, confirmPassword});

    res.sendStatus(201);
};

export async function signInUser(req:Request, res: Response) {
    res.sendStatus(200);
};