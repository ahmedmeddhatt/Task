"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddlewares = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong !!';
    res.status(status).json({ status, message });
};
exports.default = errorMiddlewares;
