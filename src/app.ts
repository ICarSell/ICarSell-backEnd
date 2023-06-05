import express, { Application } from "express";

import cors from "cors";
import { announcementRouter } from "./routes";

export const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/announcement", announcementRouter);
