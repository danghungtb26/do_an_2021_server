"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secretkey = exports.databaseName = exports.password = exports.username = exports.database_name = exports.hostApi = exports.hostDatabase = exports.baseUrlVps = exports.baseUrl = void 0;
const baseUrl = '127.0.0.1';
exports.baseUrl = baseUrl;
const baseUrlVps = '149.28.134.173'; // export const hostDatabase = 27017
// export const hostApi = 8000

exports.baseUrlVps = baseUrlVps;
const hostDatabase = 6666;
exports.hostDatabase = hostDatabase;
const hostApi = 3000;
exports.hostApi = hostApi;
const database_name = 'do_an_2021'; // export const databaseName = `mongodb://${baseUrl}:${hostDatabase}/${database_name}?replicaSet=rs`
// export const databaseName = `mongodb://${baseUrl}:${hostDatabase}/${database_name}`

exports.database_name = database_name;
const username = 'admin';
exports.username = username;
const password = 'Hung15150408';
exports.password = password;
const databaseName = `mongodb+srv://hungdv:${password}@cluster0.zjojq.mongodb.net/${database_name}?retryWrites=true&w=majority&replicaSet=rs`;
exports.databaseName = databaseName;
const secretkey = 'secretkey';
exports.secretkey = secretkey;