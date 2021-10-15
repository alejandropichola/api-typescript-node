import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import RootController from "./controllers/Root/RootExpress";
import ErrorController from "./controllers/Errors/ErrorController";
import MessageController from "./controllers/Message/MessageController";
import { Response, NextFunction, Request } from "express";

dotenv.config();

if (!process.env.APP_PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10);

const app = express();

app.use(express.json({ limit: "6mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  return new RootController(app, req, res, next).getLinks();
});

app.get("/message", (req, res, next) => {
  return new MessageController(app, req, res, next).getAllMessage();
});

app.post("/message", async (req, res, next) => {
  return await new MessageController(app, req, res, next).createMessage();
});

app.put("/message/:id", async (req, res, next) => {
  return await new MessageController(app, req, res, next).updateMessage();
});

app.delete("/message/:id", async (req, res, next) => {
  return await new MessageController(app, req, res, next).deleteMessage();
});

app.get("/messages/:tag", async (req, res, next) => {
  return await new MessageController(app, req, res, next).getAllMessageTag();
});

app.get("/message/:id", async(req, res, next) =>{
  return await new MessageController(app, req, res, next).getMessage()
});

app.use((req, res, next) => {
  return ErrorController.notFound();
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  return ErrorController.show(err, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
