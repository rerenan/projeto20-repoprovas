import { Request, Response } from "express";

import * as testService from "../services/testService"

export async function createTest(req: Request, res: Response) {

    const test = await testService.postTest(req.body)
    res.status(201).send(test);
}

export async function getByDisciplines(req: Request, res: Response) {

    const tests = await testService.getByDisciplines();
    res.status(201).send(tests);
}
