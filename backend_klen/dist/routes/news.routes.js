"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_login_js_1 = require("../middleware/require-login.js");
const database_js_1 = require("../db/database.js");
const router = (0, express_1.Router)();
const getAllNews = async (_req, res, next) => {
    try {
        const queryResult = await (0, database_js_1.allNews)();
        res.json(queryResult);
    }
    catch (error) {
        next(error);
    }
};
const getOneNewsItem = async (req, res, next) => {
    try {
        const queryResult = await (0, database_js_1.oneNewsItem)(req.params.id);
        if (queryResult.length === 0) {
            res.status(404).json({
                success: false,
                message: "News item not found.",
            });
            return;
        }
        res.json(queryResult[0]);
    }
    catch (error) {
        next(error);
    }
};
const addNewsItem = async (req, res, next) => {
    try {
        let { title, slug, text } = req.body;
        title = title?.trim();
        slug = slug?.trim();
        text = text?.trim();
        if (!title || !slug || !text) {
            res.status(400).json({
                success: false,
                message: "Title, slug and text are required.",
            });
            return;
        }
        if (!title || !slug || !text) {
            res.status(400).json({
                success: false,
                message: "Title, slug and text are required.",
            });
            return;
        }
        const queryResult = await (0, database_js_1.createNewsItem)(title, slug, text);
        if (queryResult.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: "News item added.",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "News item was not added.",
        });
    }
    catch (error) {
        next(error);
    }
};
const editNewsItem = async (req, res, next) => {
    try {
        const title = req.body.title?.trim();
        const slug = req.body.slug?.trim();
        const text = req.body.text?.trim();
        if (!title || !slug || !text) {
            res.status(400).json({
                success: false,
                message: "Title, slug and text are required.",
            });
            return;
        }
        const queryResult = await (0, database_js_1.updateNewsItem)(req.params.id, title, slug, text);
        if (queryResult.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "News item not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "News item updated.",
        });
    }
    catch (error) {
        next(error);
    }
};
const removeNewsItem = async (req, res, next) => {
    try {
        const queryResult = await (0, database_js_1.deleteNewsItem)(req.params.id);
        if (queryResult.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "News item not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "News item deleted.",
        });
    }
    catch (error) {
        next(error);
    }
};
router.get("/", getAllNews);
router.get("/:id", getOneNewsItem);
router.post("/", require_login_js_1.requireLogin, addNewsItem);
router.put("/:id", require_login_js_1.requireLogin, editNewsItem);
router.delete("/:id", require_login_js_1.requireLogin, removeNewsItem);
exports.default = router;
