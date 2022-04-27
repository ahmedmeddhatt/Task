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
const user_model_1 = __importDefault(require("../user_model"));
const database_1 = __importDefault(require("../../database"));
const user = new user_model_1.default();
describe('Authentication route', () => {
    describe("is authentication exists", () => {
        it('should have an authentication method', () => {
            expect(user.authenticate).toBeDefined();
        });
    });
});
describe('Authentication logic', () => {
    const newUser = {
        "email": "ahmedmedhaat@com",
        "user_name": "Ahmed Medhat",
        "first_name": "Ahmed",
        "last_name": "Medhat",
        "password": "mypassword"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield user.create(newUser);
        newUser.id = createUser.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM users;';
        yield connection.query(sql);
        connection.release();
    }));
    it('should have user data from authentication method', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.authenticate(newUser.email, newUser.password);
        expect(userData === null || userData === void 0 ? void 0 : userData.email).toBe(newUser.email);
        expect(userData === null || userData === void 0 ? void 0 : userData.user_name).toBe(newUser.user_name);
        expect(userData === null || userData === void 0 ? void 0 : userData.first_name).toBe(newUser.first_name);
        expect(userData === null || userData === void 0 ? void 0 : userData.last_name).toBe(newUser.last_name);
    }));
    it('should return null from authentication method', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.authenticate('wrongemail.com', 'wrongpassword');
        expect(userData).toBe(null);
    }));
});
