import { Router } from "express";
import { createTest } from "../controllers/testController";
import schemaMiddleware from "../middlewares/schemaMiddleware";
import tokenMiddleware from "../middlewares/tokenMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/create", schemaMiddleware(testSchema),tokenMiddleware , createTest);

export default testRouter;