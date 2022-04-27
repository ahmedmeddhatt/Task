"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../models/user_model"));
const user = new user_model_1.default();
//AUTHENTICATION
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield user.authenticate(email, password); // as unknown
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!data) {
            res.status(401).json({ status: 'error',
                message: ` Wrong Username or Password, Please tyr again !!` });
        }
        res.status(200).json({ status: 'success', data: Object.assign(Object.assign({}, data), { token }),
            message: `User Authenticated successfully` });
    }
    catch (error) {
        return next(error);
    }
});
exports.authentication = authentication;
