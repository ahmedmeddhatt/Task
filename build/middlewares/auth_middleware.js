"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authError = (next) => {
    const error = new Error(`Login error , Please try again !`);
    error.status = 401;
    next(error);
};
const validator = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            console.log('bearer', bearer);
            if (token && bearer === 'Bearer') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    // failed to authenticate user
                    authError(next);
                }
            }
            else {
                //token type not bearer
                authError(next);
            }
        }
        else {
            // no token found
            authError(next);
        }
    }
    catch (error) {
        // no token found
        authError(next);
    }
};
exports.default = validator;
