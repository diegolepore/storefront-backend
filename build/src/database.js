"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
var pg_connection_string_1 = require("pg-connection-string");
// parse('postgres://someuser:somepassword@somehost:381/somedatabase')
// "postgres://full_stack_user:Pass1234@storefront-db-test-instance-1.cekeonejxbqq.us-east-2.rds.amazonaws.com:5432/postgres"
// postgres://<user>:<password>@<host>:<port>/<database>?<query>
dotenv_1.default.config();
var _a = process.env, ENV = _a.ENV, DATABASE_DEV_URL = _a.DATABASE_DEV_URL, DATABASE_TEST_DEV_URL = _a.DATABASE_TEST_DEV_URL, DATABASE_PROD_URL = _a.DATABASE_PROD_URL, DATABASE_STAGING_URL = _a.DATABASE_STAGING_URL, DATABASE_TEST_AWS = _a.DATABASE_TEST_AWS;
var client;
if (ENV === 'dev') {
    var config = (0, pg_connection_string_1.parse)(DATABASE_DEV_URL);
    client = new pg_1.Pool(config);
}
if (ENV === 'test_dev') {
    var config = (0, pg_connection_string_1.parse)(DATABASE_TEST_DEV_URL);
    client = new pg_1.Pool(config);
}
if (ENV === 'production') {
    var config = (0, pg_connection_string_1.parse)(DATABASE_PROD_URL);
    client = new pg_1.Pool(config);
}
if (ENV === 'staging') {
    var config = (0, pg_connection_string_1.parse)(DATABASE_STAGING_URL);
    client = new pg_1.Pool(config);
}
if (ENV === 'test_aws') {
    var config = (0, pg_connection_string_1.parse)(DATABASE_TEST_AWS);
    client = new pg_1.Pool(config);
}
exports.default = client;
