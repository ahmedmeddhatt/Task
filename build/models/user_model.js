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
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class userModel {
    // create
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO users (email , user_name ,first_name ,last_name ,password)  
            values ($1 ,$2 ,$3 ,$4 ,$5) RETURNING id,email , user_name ,first_name ,last_name`;
                // run query 
                const data = yield connection.query(sql, [
                    u.email, u.user_name, u.first_name, u.last_name, hashPassword(u.password)
                ]);
                // release connection
                connection.release();
                // return created user
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create (${u.user_name}) : ${error.message}`);
            }
        });
    }
    // get all users
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `SELECT id , email , user_name ,first_name ,last_name FROM users`;
                // run query 
                const data = yield connection.query(sql);
                // release connection
                connection.release();
                // return all users
                return data.rows;
            }
            catch (error) {
                throw new Error(`Error at getting users : ${error.message}`);
            }
        });
    }
    // get user
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `SELECT email , user_name ,first_name ,last_name FROM users where id=($1)`;
                // run query 
                const data = yield connection.query(sql, [id]);
                // release connection
                connection.release();
                // return user of the id
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not find user id ( ${id} ), ${error.message}`);
            }
        });
    }
    //update user
    updateOne(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `UPDATE users 
        SET email=$1 , user_name=$2 ,first_name=$3 ,last_name=$4 , password=$5  where id=$6
        RETURNING id,email , user_name ,first_name ,last_name`;
                // run query 
                const data = yield connection.query(sql, [
                    u.email, u.user_name, u.first_name, u.last_name, hashPassword(u.password), u.id
                ]);
                // release connection
                connection.release();
                // return updated user
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update user ${u.user_name} , ${error.message}`);
            }
        });
    }
    // delete user
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `DELETE FROM users 
                    where id=($1)
                    RETURNING id,email , user_name ,first_name ,last_name`;
                // run query 
                const data = yield connection.query(sql, [id]);
                // release connection
                connection.release();
                // return deleting message
                return data.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete user id ( ${id} ) , ${error.message}`);
            }
        });
    }
    // authenticate user
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to db
                const connection = yield database_1.default.connect();
                const sql = `SELECT password FROM users where email = $1`;
                // run query 
                const data = yield connection.query(sql, [email]);
                if (data.rows.length) {
                    const { password: hashPassword } = data.rows[0];
                    const isPasswordIsValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                    if (isPasswordIsValid) {
                        const validData = yield connection.query(`SELECT id , email , user_name ,first_name ,last_name FROM users where email = ($1)`, [email]);
                        // return authenticated user
                        return validData.rows[0];
                    }
                }
                // release connection
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error(`Unable to login : ${error.message}`);
            }
        });
    }
}
exports.default = userModel;
