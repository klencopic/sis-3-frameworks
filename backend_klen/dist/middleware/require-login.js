"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).json({
            success: false,
            message: "You must be logged in to access this endpoint.",
        });
        return;
    }
    next();
};
exports.requireLogin = requireLogin;
