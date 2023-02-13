"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    password: "root",
    user: "root",
    host: "postgres",
});
client.connect().then(() => console.log('Connected')).catch(console.log);
