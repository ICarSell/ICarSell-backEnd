import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import { announcementRouter } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/announcement", announcementRouter);

app.use(handleErrors);
export default app;
