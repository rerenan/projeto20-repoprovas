import { Request, Response, NextFunction } from 'express';

export default async function errorMiddleware(
    error: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
){
    if(error.type === "unauthorized") res.status(401).send(error.message);
    if(error.type === "notFound") res.status(404).send(error.message);
    if(error.type === "conflict") res.status(409).send(error.message);
    if(error.type === "unprocessableEntity") res.status(422).send(error.message);

    console.log(error);
    res.sendStatus(500);
};