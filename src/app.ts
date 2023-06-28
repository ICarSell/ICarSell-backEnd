import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import {
  addressRouter,
  announcementRouter,
  commentsRouter,
  loginRouter,
  usersRouter,
} from "./routes";
import path from "path";
import { resetPasswordrouter } from "./routes/recoverPassword/recoverPassword.routes";

const app: Application = express();

app.use(express.json());
app.use("/public/uploads", express.static("public/uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/announcement", announcementRouter);
app.use("/login", loginRouter);
app.use("/user", usersRouter);
app.use("/address", addressRouter);
app.use("/comments", commentsRouter);
app.use("", resetPasswordrouter);
app.use(handleErrors);
export default app;
