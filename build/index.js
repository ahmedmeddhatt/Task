"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_Middleware_1 = __importDefault(require("./middlewares/error_Middleware"));
const config_1 = __importDefault(require("./config"));
const index_1 = __importDefault(require("./database/index"));
const routes_1 = __importDefault(require("./routes"));
index_1.default.connect().then((Client) => {
    return Client.query('SELECT NOW()').then((res) => {
        Client.release();
        console.log(res.rows);
    }).catch((err) => {
        Client.release();
        console.log(err.stack);
    });
});
// create instance server
const app = (0, express_1.default)();
// parser incoming requests middleware
app.use(express_1.default.json());
const Port = config_1.default.port || 3000;
// http request logger middleware
app.use((0, morgan_1.default)('common'));
// http security middleware
app.use((0, helmet_1.default)());
// request limmiter middleware
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many accounts created from this IP, please try again after 15 minutes.',
}));
//adding route 
app.get('/', (req, res) => {
    res.status(200).send('hello world🌍');
});
// app routes
app.use('/api', routes_1.default);
// error handler middleware
app.use(error_Middleware_1.default);
// route not exist handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found !!'
    });
});
// start express server
app.listen(Port, () => {
    console.log(`Server is starting at port : ${Port}`);
});
exports.default = app;
