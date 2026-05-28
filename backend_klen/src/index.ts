import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import newsRouter from "./routes/news.routes.js";
import usersRouter from "./routes/users.routes.js";
import cors from "cors";
import path from "path";

const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("Curent dir: " + __dirname);
app.use(express.static(path.join(__dirname, "frontend-build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})


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
