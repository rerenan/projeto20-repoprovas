import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as userRepository from "../repositories/userRepository"

dotenv.config();

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) throw {type: "Unauthorized", message: "Token invalid"};
    const token = authorization?.replace("Bearer ", "").trim();
    try{
        const JWT_SECRET = process.env.JWT_SECRET
        const {userId} = jwt.verify(token, JWT_SECRET) as {userId: number};
        const user = await userRepository.findById(userId);

        res.locals.user = user;
        
        next();
    }catch(err){
        throw {type: "unauthorized", message: "token invalid"};
    }; 
};