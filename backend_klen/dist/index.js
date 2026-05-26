"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const news_routes_js_1 = __importDefault(require("./routes/news.routes.js"));
const users_routes_js_1 = __importDefault(require("./routes/users.routes.js"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "temporary-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
console.log("Curent dir: " + __dirname);
app.use(express_1.default.static(path_1.default.join(__dirname, "frontend-build")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
});
app.use("/news", news_routes_js_1.default);
app.use("/users", users_routes_js_1.default);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
