"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var order_products_1 = __importDefault(require("./handlers/order_products"));
var cart_1 = __importDefault(require("./handlers/cart"));
var cors = require('cors');
var envPort;
var ENV = process.env.ENV;
if (ENV === 'test_dev' || ENV === 'test_aws') {
    envPort = 3333;
}
else if (ENV === 'dev') {
    envPort = process.env.APP_PORT;
}
else if (ENV === 'production') {
    envPort = process.env.APP_PROD_PORT;
}
else if (ENV === 'staging') {
    envPort = process.env.APP_STAGING_PORT;
}
var app = (0, express_1.default)();
var port = process.env.PORT || envPort;
app.use(express_1.default.json());
app.use(cors());
app.get('/', function (req, res) {
    res.send('Api root');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, dashboard_1.default)(app);
(0, orders_1.default)(app);
(0, order_products_1.default)(app);
(0, cart_1.default)(app);
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("Server started at http://localhost:" + port);
});
exports.default = app;
