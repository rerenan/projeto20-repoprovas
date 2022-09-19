import { Router } from "express";
import { createTest, getByDisciplines, getByTeachers } from "../controllers/testController";
import schemaMiddleware from "../middlewares/schemaMiddleware";
import tokenMiddleware from "../middlewares/tokenMiddleware";
import { testSchema } from "../utils/schemas/testSchema";

const testRouter = Router();

testRouter.post("/create", schemaMiddleware(testSchema), tokenMiddleware, createTest);
testRouter.get("/bydiscipline", getByDisciplines);
testRouter.get("/byteacher", getByTeachers);

export default testRouter;