"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.authUser = exports.deleteNewsItem = exports.updateNewsItem = exports.createNewsItem = exports.oneNewsItem = exports.allNews = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const allNews = async () => {
    const [rows] = await pool.query("SELECT * FROM news");
    return rows;
};
exports.allNews = allNews;
const oneNewsItem = async (id) => {
    const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
    return rows;
};
exports.oneNewsItem = oneNewsItem;
const createNewsItem = async (title, slug, text) => {
    const [result] = await pool.query("INSERT INTO news (title, slug, text) VALUES (?, ?, ?)", [title, slug, text]);
    return result;
};
exports.createNewsItem = createNewsItem;
const updateNewsItem = async (id, title, slug, text) => {
    const [result] = await pool.query("UPDATE news SET title = ?, slug = ?, text = ? WHERE id = ?", [title, slug, text, id]);
    return result;
};
exports.updateNewsItem = updateNewsItem;
const deleteNewsItem = async (id) => {
    const [result] = await pool.query("DELETE FROM news WHERE id = ?", [id]);
    return result;
};
exports.deleteNewsItem = deleteNewsItem;
const authUser = async (username) => {
    const [rows] = await pool.query("SELECT * FROM user_login WHERE user_name = ?", [username]);
    return rows;
};
exports.authUser = authUser;
const createUser = async (username, email, password) => {
    const [result] = await pool.query("INSERT INTO user_login (user_name, user_email, user_password) VALUES (?, ?, ?)", [username, email, password]);
    return result;
};
exports.createUser = createUser;
