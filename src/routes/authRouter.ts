import { signUpSchema, signInSchema } from './../schemas/authSchema';
import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController";
import schemaMiddleware from "../middlewares/schemaMiddleware";

const authRouter = Router();

authRouter.post("/signup", schemaMiddleware(signUpSchema), signUpUser);
authRouter.post("/signin", schemaMiddleware(signInSchema), signInUser);

export default authRouter;