"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelPg = void 0;
var pg_1 = require("pg");
//#region /// RELPG CLASS \\\
var PG = /** @class */ (function () {
    function PG(db_host, db_port, db_user, db_name, db_password) {
        this.db_host = db_host;
        this.db_name = db_name;
        this.db_password = db_password;
        this.db_port = db_port;
        this.db_user = db_user;
    }
    /**
     *
    * ### DBINFO()
    *
    * Return the current database connect infos
    *
    * > Return
    * > - `DB HOST`
    * > - `DB PORT`
    * > - `DB NAME`
    * > - `DB USER`
    * > - `DB PASS`
    *
    * ---
    */
    PG.prototype.DBINFO = function () {
        return " DB HOST : ".concat(this.db_host, " \n DB PORT : ").concat(this.db_port, " \n DB NAME : ").concat(this.db_name, " \n DB USER : ").concat(this.db_user, " \n DB PASS : ").concat(this.db_password, " \n");
    };
    /**
     *
     * ### DBCONNECT()
     *
     * opens new database connection
     *
     */
    PG.prototype.DBCONNECT = function () {
        return new pg_1.Pool({
            user: this.db_user,
            host: this.db_host,
            database: this.db_name,
            password: this.db_password,
            port: this.db_port,
        });
    };
    return PG;
}());
//#endregion
//#region /// RELPG CLASS \\\
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
var RelPg = /** @class */ (function (_super) {
    __extends(RelPg, _super);
    function RelPg(db_host, db_port, db_user, db_name, db_password) {
        if (db_host === void 0) { db_host = "localhost"; }
        if (db_port === void 0) { db_port = 5432; }
        if (db_user === void 0) { db_user = "postgres"; }
        if (db_name === void 0) { db_name = "postgres"; }
        if (db_password === void 0) { db_password = "1234"; }
        var _this = _super.call(this, db_host, db_port, db_user, db_name, db_password) || this;
        _this.db = _this.DBCONNECT();
        return _this;
    }
    //#region /// CREATE SYMBOL FUNCTIONS \\\
    /**
     *  For queries, they create references to query values ​​with $
     */
    RelPg.prototype.CREATE$ = function (num) {
        var b = "";
        for (var i = 0; i < num; i++) {
            i !== 0 ? b += ",$" + (i + 1) : b += "$" + 1;
        }
        return b;
    };
    RelPg.prototype.CREATEEQUAL$ = function (titles) {
        var b = "";
        for (var i = 0; i < titles.length; i++) {
            i !== 0 ? b += "," + titles[i] + "=$" + (i + 1) : b += titles[i] + "=$" + 1;
        }
        return b;
    };
    RelPg.prototype.CREATEEQUAL$AND = function (titles, plus) {
        if (plus === void 0) { plus = 1; }
        var b = "";
        for (var i = 0; i < titles.length; i++) {
            i !== 0 ? b += " AND " + titles[i] + "=$" + (i + plus) : b += titles[i] + "=$" + plus;
        }
        return b;
    };
    //#endregion
    //#region /// QUERY \\\
    /**
    * ### Query()
    *
    * Runs the given query against the database with the given values
    * > Return `result`
    * ---
    *
    * ### Options
    *
    * | OPTION             | TYPE                        | DEFAULT     | DESCRIPTION
    * | :-                 | :-                          | :-          | :-
    * | **query**          | string                      | `""`        | query string
    * | **values**         | (string \| number)[]        | `[]`        | query table values
    *
    * ---
    *
    *
    * ```ts
    *
    *  const result = await Query('SELECT * FROM WHERE id=$1',["aaaa-bbbb-cccc-dddd"])
    *
    * ```
    *
    *
    */
    RelPg.prototype.Query = function (query, values) {
        if (values === void 0) { values = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.db.query(query, values, function (error, result) {
                            if (error) {
                                console.log(error);
                            }
                            resolve(result);
                        });
                    })];
            });
        });
    };
    //#endregion
    ///////////////////// CRUD METHODS \\\\\\\\\\\\\\\\\\\\\\\\
    //#region /// LIST \\\
    /**
     * ### LIST()
     *
     * Runs a SELECT query based on the given table name and table titles
     *
     * It creates a SELECT string based on the parameters it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE                   | DEFAULT     | DESCRIPTION
     * | :-                 | :-                     | :-          | :-
     * | **tableName**      | string                 | `""`        | Table name to list
     * | **titles**         | string                 | `*`         | Table headers of the values ​​to be listed
     * | **where**          | string                 | `""`        | Query reference if any
     * | **values**         | (string \| number)[]   | `[]`        | Query reference values
     * | **more**           | string                 | `""`        | Query continuation if any
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.LIST("users")
     * ```
     * > convert `SELECT * FROM users`
     *  ```ts
     * await RELPG.LIST("users","uid,date")
     * ```
     * > convert `SELECT uid,date FROM users`
     *  ```ts
     * await RELPG.LIST("users","*","user_phone,user_status",["+901111111111",1])
     * ```
     * > convert `SELECT * FROM users WHERE user_phone=$1AND user_status=$2`
     *  ```ts
     * await RELPG.LIST("users","*","user_phone,user_status",["+901111111111",1],"ORDER BY uid ASC")
     * ```
     * > convert `SELECT * FROM users WHERE user_phone=$1AND user_status=$2 ORDER BY uid ASC`
     *
     */
    RelPg.prototype.LIST = function (
    /**
     *  `Table Name`
     */
    tableName, 
    /**
     *  `Titles`
     *
     * Note : The contents are a string separated by commas
     */
    titles, 
    /**
     *  `where`
     *
     * Which filters will be used to query when needed?
     *
     * Note: this value also requires 'values' to be filled in
     */
    where, 
    /**
     *  `values`
     *
     * filter values
     */
    values, 
    /**
    *  `more`
    *
    * optional query continuation
    */
    more) {
        if (titles === void 0) { titles = "*"; }
        if (where === void 0) { where = ""; }
        if (values === void 0) { values = []; }
        if (more === void 0) { more = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (where !== "" && values.length > 0) {
                            more = "WHERE ".concat(this.CREATEEQUAL$AND(where.split(",")), " ") + more;
                        }
                        q = "SELECT ".concat(titles, " FROM ").concat(tableName, " ").concat(more);
                        return [4 /*yield*/, this.Query(q, values)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    //#region /// ADD \\\
    /**
     * ### ADD()
     *
     * Runs a INSERT query based on the given table name and table titles
     *
     * It creates a INSERT string based on the parameters it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
     * | :-                 | :-                     | :-              | :-
     * | **tableName**      | string                 | `""`            | Table name to add
     * | **titles**         | string                 | `""`            | Table headers of the values ​​to be added
     * | **values**         | (string \| number)[]   | `[]`            | Query reference values
     * | **more**           | string                 | `RETURNING *;`  | Query continuation if any
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.ADD("users","user_name,user_surname",["Berk","Coşar"])
     * ```
     * > convert `INSERT INTO users (user_name,user_surname) VALUES ($1,$2) RETURNING *;`
     *
     */
    RelPg.prototype.ADD = function (
    /**
     *  `Table Name`
     */
    tableName, 
    /**
     *  `Titles`
     *
     * table headers to add values ​​to
     *
     * Note : The contents are a string separated by commas
     */
    titles, 
    /**
     *  `values`
     *
     * header values ​​to add
     */
    values, 
    /**
    *  `more`
    *
    * optional query continuation
    */
    more) {
        if (titles === void 0) { titles = ""; }
        if (values === void 0) { values = []; }
        if (more === void 0) { more = "RETURNING *;"; }
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = "INSERT INTO ".concat(tableName, " (").concat(titles, ") VALUES (").concat(this.CREATE$(titles.split(",").length), ") ").concat(more);
                        return [4 /*yield*/, this.Query(q, values)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    //#region /// UPDATE \\\
    /**
     * ### UPDATE()
     *
     * Runs a UPDATE query based on the given table name and table titles
     *
     * It creates a UPDATE string based on the parameters it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
     * | :-                 | :-                     | :-              | :-
     * | **tableName**      | string                 | `""`            | Table name to add
     * | **titles**         | string                 | `""`            | Table headers of the values ​​to be added
     * | **where**          | string                 | `""`            | Query reference if any
     * | **values**         | (string \| number)[]   | `[]`            | Query reference values
     * | **more**           | string                 | `RETURNING *;`  | Query continuation if any
     *
     *
     *
     * ---
     *
     * ### Examples
     *
     *```ts
     *
     * await RELPG.UPDATE("users","user_name","uid",["Berk","aaa-bbb-ccc"])
     *
     * ```
     * > convert `UPDATE users SET user_name=$1 WHERE uid=$2  RETURNING *;`
     *
     * ```ts
     *
     * await RELPG.UPDATE("users","user_name,user_surname","uid,user_surname",["Berk","Coşar","aaa-bbb-ccc","Coşar"])
     *
     * ```
     * > convert `UPDATE users SET user_name=$1,user_surname=$2 WHERE uid=$3 AND user_surname=$4  RETURNING *;`
     *
     */
    RelPg.prototype.UPDATE = function (
    /**
     *  `Table Name`
     */
    tableName, 
    /**
     *  `Titles`
     *
     * table headers to update values ​​to
     *
     * Note: this value also requires 'values' to be filled in
     *
     * Note : The contents are a string separated by commas
     */
    titles, 
    /**
     *  `where`
     *
     * Which filters will be used to query?
     *
     * Note: this value also requires 'values' to be filled in
     *
     * Note: The contents are a string separated by commas
     */
    where, 
    /**
     *  `values`
     *
     * header values ​​to update
     *
     * ---
     *
     * ## WARNING : The value given for the "where" parameter must be the last element of the "values" array.
     *
     * ---
     *
     * ### Example
     * ```ts
     *  await RELPG.UPDATE(
     * "users","user_name","uid",["Berk","aaa-bbb-ccc-ddd"])
     *                              |         |
     *                              |         |-> where value
     *                              |-> title value
     *
     * // ["aaa-bbb-ccc-ddd","Berk"] -> wrong use
     * ```
     */
    values, 
    /**
    *  `more`
    *
    * optional query continuation
    */
    more) {
        if (titles === void 0) { titles = ""; }
        if (where === void 0) { where = ""; }
        if (values === void 0) { values = []; }
        if (more === void 0) { more = "RETURNING *;"; }
        return __awaiter(this, void 0, void 0, function () {
            var t, w, q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = titles.split(",");
                        w = where.split(",");
                        q = "UPDATE ".concat(tableName, " SET ").concat(this.CREATEEQUAL$(t), " WHERE ").concat(this.CREATEEQUAL$AND(w, t.length + 1), "  ").concat(more);
                        return [4 /*yield*/, this.Query(q, values)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    //#region /// DEL \\\
    /**
     * ### DEL()
     *
     * Runs a DELETE query based on the given table name and table titles
     *
     * It creates a DELETE string based on the parameters it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
     * | :-                 | :-                     | :-              | :-
     * | **tableName**      | string                 | `""`            | Table name that owns the row to be deleted
     * | **where**          | string                 | `""`            | Query reference
     * | **values**         | (string \| number)[]   | `[]`            | Query reference values
     * | **more**           | string                 | `RETURNING *;`  | Query continuation if any
     *
     *
     * ---
     *
     * ### Examples
     *
     *```ts
     *
     * await RELPG.DEL("users")
     *
     * ```
     * > convert `DELETE FROM users RETURNING *;`
     *
     * ```ts
     *
     *  await RELPG.DEL("users","uid",["aaa-bbb-ccc-ddd"])
     *
     * ```
     * > convert `DELETE FROM users WHERE uid=$1 RETURNING *;`
     *
     * ```ts
     *
     *  await RELPG.DEL("users","user_name,user_surname",["Berk","Coşar"])
     *
     * ```
     * > convert `DELETE FROM users WHERE user_name=$1 AND user_surname=$2 RETURNING *;`
     *
     */
    RelPg.prototype.DEL = function (
    /**
     *  `Table Name`
     */
    tableName, 
    /**
     *  `where`
     *
     * Which filters will be used to query?
     *
     * Note: this value also requires 'values' to be filled in
     *
     * Note: The contents are a string separated by commas
     */
    where, 
    /**
     *  `values`
     *
     * header values ​​to update
     *
     */
    values, 
    /**
    *  `more`
    *
    * optional query continuation
    */
    more) {
        if (where === void 0) { where = ""; }
        if (values === void 0) { values = []; }
        if (more === void 0) { more = "RETURNING *;"; }
        return __awaiter(this, void 0, void 0, function () {
            var w, q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (where !== "" && values.length > 0) {
                            w = where.split(",");
                            more = "WHERE ".concat(this.CREATEEQUAL$AND(w), " ") + more;
                        }
                        q = "DELETE FROM ".concat(tableName, " ").concat(more);
                        return [4 /*yield*/, this.Query(q, values)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    ///////////////////// DATABASE METHODS \\\\\\\\\\\\\\\\\\\\\\\\
    //#region /// LISTDB \\\
    /**
     * ### LISTDB()
     *
     * Runs a SELECT query based on the given database infos
     *
     * It creates a SELECT string based on the parameters it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE        | DEFAULT     | DESCRIPTION
     * | :-                 | :-          | :-          | :-
     * | **titles**         | string      | `datname`   | database headers of the values ​​to be listed
     * | **where**          | string      | `datname`   | Query reference
     * | **value**          | string      | `""`        | Query reference values
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.LISTDB("postgres")
     * ```
     * > convert `SELECT datname FROM pg_catalog.pg_database WHERE datname = 'postgres'`
     */
    RelPg.prototype.LISTDB = function (
    /**
     * `value`
     *
     * NOTE: takes a single value
     *
     * filter value
     */
    value, 
    /**
     *  `Titles`
     *
     * NOTE: takes a single value
     *
     */
    titles, 
    /**
     *  `where`
     *
     * Which filters will be used to query
     *
     * NOTE: takes a single value
     *
     * Note: this value also requires 'values' to be filled in
     */
    where) {
        if (value === void 0) { value = ""; }
        if (titles === void 0) { titles = "datname"; }
        if (where === void 0) { where = "datname"; }
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = "SELECT ".concat(titles, " FROM pg_catalog.pg_database WHERE ").concat(where, " = '").concat(value, "'");
                        return [4 /*yield*/, this.Query(q)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    //#region /// DELETEDB \\\
    /**
     * ### DELETEDB()
     *
     * Runs a DELETE query based on the given database name
     *
     * It creates a DELETE string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **DBName**         | string         | `""`        | Database name to be deleted
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.DELETEDB("postgres")
     * ```
     * > convert `DROP DATABASE IF EXISTS postgres`
     *
     */
    RelPg.prototype.DELETEDB = function (
    /**
     *  `Database Name`
     */
    DBName) {
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = "DROP DATABASE IF EXISTS ".concat(DBName);
                        return [4 /*yield*/, this.Query(q)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    //#region /// CREATEDB \\\
    /**
     * ### CREATEDB()
     *
     * Runs a CREATE query based on the given database name
     *
     * It creates a CREATE string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **DBName**         | string         | `""`        | Database name to be created
     * | **force**          | boolean        | `false`     | Force database creation
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.CREATEDB("postgres")
     * ```
     * > convert `CREATE DATABASE postgres`
     *
     */
    RelPg.prototype.CREATEDB = function (
    /**
     *  `Database Name`
     */
    DBName, 
    /**
     *  `force status`
     *
     * If the "force" value is true, the conflicting database is deleted and a new database with the same name is created.
     *
     * NOTE : This action will delete all data in the database.
     */
    force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var q, rd, q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!force) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.DELETEDB(DBName)];
                    case 1:
                        _a.sent();
                        q = "CREATE DATABASE ".concat(DBName);
                        return [4 /*yield*/, this.Query(q)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.LISTDB(DBName)];
                    case 4:
                        rd = _a.sent();
                        if (!(rd.rowCount > 0)) return [3 /*break*/, 5];
                        console.log("Database already exists");
                        return [2 /*return*/, rd.rows];
                    case 5:
                        q = "CREATE DATABASE ".concat(DBName);
                        return [4 /*yield*/, this.Query(q)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion
    ///////////////////// TABLE METHODS \\\\\\\\\\\\\\\\\\\\\\\\
    //#region /// CREATETABLE \\\
    /**
     * ### CREATETABLE()
     *
     * Runs a CREATE query based on the given table name
     *
     * It creates a CREATE string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     *
     * ### Options
     *
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Table name to be created
     * | **force**          | boolean        | `false`     | Force database creation
     *
     *
     *
     * ---
     *
     * ### Examples
     * ```ts
     * await RELPG.
     * ```
     * > convert ``
     *
     */
    RelPg.prototype.CREATETABLE = function (
    /**
     *  `Table Name`
     */
    TableName, 
    /**
     *  `force status`
     *
     * If the "force" value is true, overwrites even if the table name to be created exists
     *
     * NOTE : This action will delete all data in the table.
     */
    force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                q = "CREATE TABLE ".concat(force ? "" : "[IF NOT EXISTS]", " ").concat(TableName);
                console.log(q);
                return [2 /*return*/];
            });
        });
    };
    return RelPg;
}(PG));
exports.RelPg = RelPg;
//#endregion
// "smallint": "smallint",
// "integer": "integer",
// "bigint": "bigint",
// "decimal": "numeric",
// "numeric": "numeric",
// "real": "real",
// "double precision": "double precision",
// "smallserial": "smallint",
// "serial": "integer",
// "bigserial": "bigint",
// "money": "money",
// "character varying(n)": "varchar(n)",
// "character(n)": "char(n)",
// "text": "text",
// "date": "date",
// "time": "time without time zone",
// "time with time zone": "time with time zone",
// "timestamp": "timestamp without time zone",
// "timestamp with time zone": "timestamp with time zone",
// "boolean": "boolean",
// "enum": "enum",
// "uuid": "uuid",
// "json": "json",
// "jsonb": "jsonb",
// "bytea": "bytea",
// "bit(n)": "bit(n)",
// "bit varying(n)": "varbit(n)",
// "interval": "interval",
// "oid": "oid",
// "macaddr": "macaddr",
// "cidr": "cidr",
// "inet": "inet",
// "macaddr8": "macaddr8",
// "pg_lsn": "pg_lsn",
// "pg_snapshot": "pg_snapshot",
// "box": "box",
// "point": "point",
// "path": "path",
// "polygon": "polygon",
// "line": "line",
// "lseg": "lseg",
// "circle": "circle",
// "line_segment": "line_segment",
// "tsquery": "tsquery",
// "tsvector": "tsvector",
// "tsrange": "tsrange",
// "tstzrange": "tstzrange",
// "daterange": "daterange",
// "int4range": "int4range",
// "int8range": "int8range",
// "numrange": "numrange",
// "tsquery": "tsquery",
// "regclass": "regclass",
// "regnamespace": "regnamespace",
// "regproc": "regproc",
// "regprocedure": "regprocedure",
// "regoper": "regoper",
// "regoperator": "regoperator",
// "regconfig": "regconfig",
// "regdictionary": "regdictionary"
