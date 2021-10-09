"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyJWT = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decodedAccessToken = jsonwebtoken_1.default.decode(token);
        var tokenSecret = process.env.TOKEN_SECRET;
        req.body.userId = decodedAccessToken.user.id;
        jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyJWT = verifyJWT;
