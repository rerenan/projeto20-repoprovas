import { Router } from "express";
import { createTest } from "../controllers/testController";
import schemaMiddleware from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/create", schemaMiddleware(testSchema), createTest);

export default testRouter;