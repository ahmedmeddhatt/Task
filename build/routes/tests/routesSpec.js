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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const user_model_1 = __importDefault(require("../../models/user_model"));
const database_1 = __importDefault(require("../../database"));
const user = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('ROUTES', () => {
    const newUser = {
        "id": "0",
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
    describe("AUTHENTICATION METHOD", () => {
        console.log(newUser, 'newUser');
        it('should return TOKEN with user data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                "email": "ahmedmedhaat@com",
                "password": "mypassword"
            });
            console.log(newUser, 'newUser');
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(newUser.id);
            expect(email).toBe("ahmedmedhaat@com");
            token = userToken;
        }));
        it('should return ERROR as AUTHENTICATION failed', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                "email": "ahm@com",
                "password": "mypassword"
            });
            expect(res.status).toBe(401);
        }));
    });
    describe('CRUD API METHODS', () => {
        it('should CREATE new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/api/users/')
                .set('Content-type', 'application/json')
                .send({
                "email": "ahmedd@medhat.com",
                "user_name": "Ahmed Medhat",
                "first_name": "Ahmed",
                "last_name": "Medhat",
                "password": "mypassword"
            });
            expect(res.status).toBe(201);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe("ahmedd@medhat.com");
            expect(user_name).toBe("Ahmed Medhat");
            expect(first_name).toBe("Ahmed");
            expect(last_name).toBe("Medhat");
        }));
        it('should return ALL USERS', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        }));
        it('should return ONE USER', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get(`/api/users/${newUser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_name).toBe('Ahmed Medhat');
            //  expect(res.body.data.id).toBe(newUser.id) ;
        }));
        it('should UPDATE THE USER', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.put(`/api/users/${newUser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, newUser), { first_name: "name" }));
            expect(res.status).toBe(201);
            const { id, email, user_name, first_name, last_name } = res.body.data;
            expect(id).toBe(newUser.id);
            expect(email).toBe(newUser.email);
            expect(user_name).toBe(newUser.user_name);
            expect(first_name).toBe("name");
            expect(last_name).toBe(newUser.last_name);
        }));
        it('should DELETE THE USER', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.delete(`/api/users/${newUser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
    });
});
