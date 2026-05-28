"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_js_1 = require("../db/database.js");
const router = (0, express_1.Router)();
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: "Username and password are required.",
            });
            return;
        }
        const queryResult = await (0, database_js_1.authUser)(username);
        if (queryResult.length === 0) {
            res.status(401).json({
                success: false,
                message: "User is not registered.",
            });
            return;
        }
        const user = queryResult[0];
        if (password !== user.user_password) {
            res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user.id,
                username: user.user_name,
                email: user.user_email,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Username, email and password are required.",
            });
            return;
        }
        const queryResult = await (0, database_js_1.createUser)(username, email, password);
        if (queryResult.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: "User registered.",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "User was not registered.",
        });
    }
    catch (error) {
        next(error);
    }
};
router.post("/login", loginUser);
router.post("/register", registerUser);
exports.default = router;
