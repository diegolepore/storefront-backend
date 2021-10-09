"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS;
var pepper = BCRYPT_PASSWORD;
var saltRounds = SALT_ROUNDS;
var excludeObjectProps = function (objToFilter, prop) {
    return Object.keys(objToFilter).filter(function (key) {
        return key !== prop;
    }).reduce(function (obj, current) {
        var _a;
        return __assign(__assign({}, obj), (_a = {}, _a[current] = objToFilter[current], _a));
    }, {});
};
exports.UserStore = {
    create: function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, hash, result, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO users (first_name, last_name, email, pass) VALUES ($1, $2, $3, $4) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcrypt_1.default.hashSync(u.pass + pepper, parseInt(saltRounds));
                        return [4 /*yield*/, conn.query(sql, [u.first_name, u.last_name, u.email, hash])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, excludeObjectProps(user, 'pass')];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not add new user. Error: " + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    index: function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Cannot get users. Error: " + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    show: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, excludeObjectProps(result.rows[0], 'pass')];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Cannot get user. Error: " + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    delete: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Cannot delete user. Error: " + error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    authenticate: function (email, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE email=($1)';
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        user = void 0;
                        if (result.rows.length) {
                            user = result.rows[0];
                            if (bcrypt_1.default.compareSync(pass + pepper, user.pass)) {
                                conn.release();
                                return [2 /*return*/, excludeObjectProps(user, 'pass')];
                            }
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Could not log the user in. Error: " + error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
