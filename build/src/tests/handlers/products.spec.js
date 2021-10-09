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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var access_token = '';
var userId = 0;
var productId = 0;
var request = (0, supertest_1.default)(server_1.default);
var user = {
    first_name: 'Michael',
    last_name: 'Jordan',
    email: 'mj@test.com',
    pass: 'Pass1234'
};
var product = {
    name: 'iPhone X-pensive',
    description: 'This smarthphone is really cool and expensive',
    image_url: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36827_24756a33-907f-4a5a-ac95-73ce492104e7.jpg',
    price: 800,
    category: 'smartphones'
};
describe('📦 /products route suite', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var u, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users')
                        .send(user)
                        .expect('Content-Type', /json/)];
                case 1:
                    u = _a.sent();
                    return [4 /*yield*/, request
                            .post('/users/auth')
                            .send({
                            email: user.email,
                            pass: user.pass
                        })
                            .expect('Content-Type', /json/)
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ];
                case 2:
                    response = _a.sent();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    userId = u.body.id;
                    access_token = response.body.access_token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/users/" + userId)
                        .set('Authorization', "Bearer " + access_token)
                        .expect('Content-Type', /json/)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should create a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/products')
                        .set('Authorization', "Bearer " + access_token)
                        .send(product)
                        .expect('Content-Type', /json/)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ];
                case 1:
                    response = _a.sent();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    productId = response.body.id;
                    expect(response.body.name).toBe(product.name);
                    expect(response.body.description).toBe(product.description);
                    expect(response.body.image_url).toBe(product.image_url);
                    expect(response.body.price).toBe(product.price);
                    expect(response.body.category).toBe(product.category);
                    expect(response.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/products')];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toBeGreaterThan(0);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get single products by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/products/" + productId)];
                case 1:
                    response = _a.sent();
                    expect(response.body.name).toBe(product.name);
                    expect(response.body.description).toBe(product.description);
                    expect(response.body.image_url).toBe(product.image_url);
                    expect(response.body.price).toBe(product.price);
                    expect(response.body.category).toBe(product.category);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should delete single product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/products/" + productId)
                        .set('Authorization', "Bearer " + access_token)];
                case 1:
                    response = _a.sent();
                    expect(response.body.name).toBe(product.name);
                    expect(response.body.description).toBe(product.description);
                    expect(response.body.image_url).toBe(product.image_url);
                    expect(response.body.price).toBe(product.price);
                    expect(response.body.category).toBe(product.category);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
