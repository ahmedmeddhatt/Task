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
describe('User model', () => {
    describe("is authentication exists", () => {
        it('should have an FIND ALL USERS method', () => {
            expect(user.getMany).toBeDefined();
        });
        it('should have an FIND ONE USER method', () => {
            expect(user.getOne).toBeDefined();
        });
        it('should have an CREATE method', () => {
            expect(user.create).toBeDefined();
        });
        it('should have an UPDATE method', () => {
            expect(user.updateOne).toBeDefined();
        });
        it('should have an DELETE method', () => {
            expect(user.deleteOne).toBeDefined();
        });
        it('should have an AUTHENTICATION method', () => {
            expect(user.authenticate).toBeDefined();
        });
    });
});
describe('User model logic', () => {
    const newUser = {
        "email": "ahmed@com",
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
    it('should CREATE new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield user.create({
            "email": "ahmedd@com",
            "user_name": "Ahmed Medhat",
            "first_name": "Ahmed",
            "last_name": "Medhat",
            "password": "mypassword"
        });
        expect(createUser).toEqual({
            id: createUser.id,
            "email": "ahmedd@com",
            "user_name": "Ahmed Medhat",
            "first_name": "Ahmed",
            "last_name": "Medhat",
        });
    }));
    it('should return ALL USERS', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.getMany();
        expect(userData.length).toBe(2);
    }));
    it('should return ONE USER with this ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.getOne(newUser.id);
        expect(userData.email).toBe(newUser.email);
        expect(userData.user_name).toBe(newUser.user_name);
        expect(userData.first_name).toBe(newUser.first_name);
        expect(userData.last_name).toBe(newUser.last_name);
    }));
    it('should UPDATE the user with the id ', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.updateOne(Object.assign(Object.assign({}, newUser), { "user_name": "Ahmed" }));
        expect(userData.id).toBe(newUser.id);
        expect(userData.email).toBe(newUser.email);
        expect(userData.user_name).toBe('Ahmed');
        expect(userData.first_name).toBe(newUser.first_name);
        expect(userData.last_name).toBe(newUser.last_name);
    }));
    it('should return NULL', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield user.deleteOne(newUser.id);
        expect(userData.id).toBe(newUser.id);
    }));
});
