"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PG {
    constructor(db_host, db_port, db_user, db_name, db_password) {
        this.db_host = db_host;
        this.db_name = db_name;
        this.db_password = db_password;
        this.db_port = db_port;
        this.db_user = db_user;
    }
    GetDBInfos() {
        return ` DB HOST : ${this.db_host} \n DB PORT : ${this.db_port} \n DB NAME : ${this.db_name} \n DB USER : ${this.db_user} \n DB PASS : ${this.db_password} \n`;
    }
    ConnectDb() {
        return new pg_1.Pool({
            user: this.db_user,
            host: this.db_host,
            database: this.db_name,
            password: this.db_password,
            port: this.db_port,
        });
    }
}
/**
* ## RelPg
*
* It is the main class of the rel-query-engine module that supports Postgresql.
*
* ---
*
* ### Options
*
* | OPTION             | TYPE          | DEFAULT     | DESCRIPTION
* | :-                 | :-            | :-          | :-
* | **db_host**        | string        | `localhost` | Server address of postgresql database
* | **db_port**        | number        | `5432`      | Server port of postgresql database
* | **db_name**        | string        | `postgres`  | Postgresql database name
* | **db_user**        | string        | `postgres`  | Postgresql database user name
* | **db_password**    | string        | `1234`      | Postgresql database password
*
*---
* ### Example:
*
* ```ts
* import relpg from "relpg";
*
* const RELPG = new relpg("localhost",5432,"postgres","postgres","password")
* ```
* ---
*
* Note: The localhost value assumes that Postgresql is installed on your system.
*/
class RelPg extends PG {
    constructor(db_host = "localhost", db_port = 5432, db_user = "postgres", db_name = "postgres", db_password = "1234") {
        super(db_host, db_port, db_user, db_name, db_password);
        this.db = this.ConnectDb();
    }
    Connect() {
        return this.ConnectDb();
    }
    SELECT() {
        this.db.query('SELECT * FROM users', [], (err, res) => {
            console.log(res);
        });
    }
}
exports.default = RelPg;
