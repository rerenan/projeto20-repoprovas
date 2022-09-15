import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routes";


const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);


export default app;