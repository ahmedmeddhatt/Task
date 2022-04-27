"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user_controller"));
const auth_controller_1 = require("../../controllers/auth_controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware"));
const routes = (0, express_1.Router)();
//adding route 
// api/users
routes.route('/')
    .get(auth_middleware_1.default, user_controller_1.default.getMany)
    .post(user_controller_1.default.Create);
// api/users/id
routes.route('/:id')
    .get(auth_middleware_1.default, user_controller_1.default.getOne)
    .put(auth_middleware_1.default, user_controller_1.default.updateOne)
    .delete(auth_middleware_1.default, user_controller_1.default.deleteOne);
//login
routes.post('/login', auth_controller_1.authentication);
exports.default = routes;
