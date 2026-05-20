import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import newsRouter from "./routes/news.routes.js";
import usersRouter from "./routes/users.routes.js";
import cors from "cors";
<<<<<<< HEAD:backend_klen/src/index.ts
=======

>>>>>>> ea4da751d88e22e0f1f9ddcc8d886571139a2f8f:back_end/src/index.ts

const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

app.use("/news", newsRouter);
app.use("/users", usersRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
