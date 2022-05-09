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
const user_model_1 = __importDefault(require("../models/user_model"));
const user = new user_model_1.default();
// GET ALL
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user.getMany();
        res.status(200).json({ Results: data.length, status: 'success', data,
            message: `All Users Reviewed successfully` });
    }
    catch (error) {
        next(error);
    }
});
//GET ONE
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user.getOne(req.params.id); // as unknown
        if (!data) {
            return res.status(404).json({ status: 'failed', message: `User Not Found` });
        }
        res.status(200).json({ status: 'success', data, message: `User Reviewed successfully` });
    }
    catch (error) {
        next(error);
    }
});
//CREATE
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user.create(req.body);
        res.status(201).json({ status: 'success', data, message: `User Created successfully` });
    }
    catch (error) {
        next(error);
    }
});
//UPDATE
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = {
            id: req.params.id,
            email: req.body.email,
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = yield user.updateOne(input);
        if (!data) {
            return res.status(404).json({ status: 'failed', message: `User Not Found` });
        }
        res.status(201).json({ status: 'success', data, message: `User Updated successfully` });
    }
    catch (error) {
        next(error);
    }
});
//DELETE
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user.deleteOne(req.params.id); // as unknown
        if (!data) {
            return res.status(404).json({ status: 'failed', message: `User Not Found` });
        }
        res.status(200).json({ status: 'success', message: `User Deleted successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    Create,
    getMany,
    getOne,
    updateOne,
    deleteOne
};
