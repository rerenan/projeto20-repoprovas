import { signUpSchema, signInSchema } from '../schemas/userSchema';
import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/userController";
import schemaMiddleware from "../middlewares/schemaMiddleware";

const userRouter = Router();

userRouter.post("/signup", schemaMiddleware(signUpSchema), signUpUser);
userRouter.post("/signin", schemaMiddleware(signInSchema), signInUser);

export default userRouter;