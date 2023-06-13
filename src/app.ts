import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import { announcementRouter, usersRouter } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/announcement", announcementRouter);
app.use("/user", usersRouter);

app.use(handleErrors);
export default app;
