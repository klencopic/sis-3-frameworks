import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import newsRouter from "./routes/news.routes.js";
import usersRouter from "./routes/users.routes.js";
import cors from "cors";
import path from "path";
import session from "express-session";

const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors({
    origin: "http://88.200.63.148:30008",
    credentials: true,
  }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "temporary-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("Curent dir: " + __dirname);
app.use(express.static(path.join(__dirname, "frontend-build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.use("/uploads", express.static("src/uploads"));

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
