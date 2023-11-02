import { Pool } from "pg";



//#region /// RELPG CLASS \\\
abstract class PG {
    /**
     * ### HostName
     * 
     * Server Ip address or Domain Name of postgresql database
     * 
     * ---
     * - #### Option: `db_host`
     * - #### Type: `string`
     * - #### Default: `localhost`
     */
    db_host: string;
    /**
     * ### Port
     * 
     * Server port of postgresql database
     * 
     * ---
     * - #### Option: `db_port`
     * - #### Type: `number`
     * - #### Default: `5432`
     */
    db_port: number;
    /**
    * ### UserName
    * 
    * Postgresql database user name
    * 
    * ---
    * - #### Option: `db_port`
    * - #### Type: `number`
    * - #### Default: `5432`
    */
    db_user: string;
    /**
    * ### DatabaseName
    * 
    * Postgresql database database name
    * 
    * ---
    * - #### Option: `db_name`
    * - #### Type: `string`
    * - #### Default: `postgres`
    */
    db_name: string;
    /**
    * ### Password
    * 
    * Postgresql database database password
    * 
    * ---
    * - #### Option: `db_password`
    * - #### Type: `string`
    * - #### Default: `1234`
    */
    db_password: string;

    constructor(
        db_host: string, db_port: number, db_user: string, db_name: string, db_password: string) {
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
    DBINFO() {
        return ` DB HOST : ${this.db_host} \n DB PORT : ${this.db_port} \n DB NAME : ${this.db_name} \n DB USER : ${this.db_user} \n DB PASS : ${this.db_password} \n`
    }
    /**
     * 
     * ### DBCONNECT() 
     * 
     * opens new database connection
     * 
     */
    DBCONNECT() {
        return new Pool({
            user: this.db_user,
            host: this.db_host,
            database: this.db_name,
            password: this.db_password,
            port: this.db_port,
        })

    }
}
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
export class RelPg extends PG {
    db: any
    constructor(
        db_host: string = "localhost",
        db_port: number = 5432,
        db_user: string = "postgres",
        db_name: string = "postgres",
        db_password: string = "1234"
    ) {
        super(db_host, db_port, db_user, db_name, db_password);
        this.db = this.DBCONNECT();
    }

    //#region /// CREATE SYMBOL FUNCTIONS \\\

    /**
     *  For queries, they create references to query values ​​with $
     */
    private CREATE$(num: number) {
        let b = ""
        for (let i = 0; i < num; i++) {
            i !== 0 ? b += ",$" + (i + 1) : b += "$" + 1

        }
        return b

    }
    private CREATEEQUAL$(titles: string[]) {
        let b = ""
        for (let i = 0; i < titles.length; i++) {
            i !== 0 ? b += "," + titles[i] + "=$" + (i + 1) : b += titles[i] + "=$" + 1

        }
        return b

    }
    private CREATEEQUAL$AND(titles: string[], plus: number = 1) {
        let b = ""
        for (let i = 0; i < titles.length; i++) {
            i !== 0 ? b += " AND " + titles[i] + "=$" + (i + plus) : b += titles[i] + "=$" + plus

        }
        return b

    }
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
    async Query(query: string, values: (string | number)[] = []) {
        return new Promise((resolve) => {
            this.db.query(query, values, (error: any, result: any) => {
                if (error) { console.log(error) }
                resolve(result);
            })

        })

    }
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
    async LIST(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `Titles`
         * 
         * Note : The contents are a string separated by commas
         */
        titles: string = "*",
        /**
         *  `where`
         * 
         * Which filters will be used to query when needed?
         * 
         * Note: this value also requires 'values' to be filled in
         */
        where: string = "",
        /**
         *  `values`
         * 
         * filter values
         */
        values: (string | number)[] = [],
        /**
        *  `more`
        * 
        * optional query continuation
        */
        more: string = "") {
        if (where !== "" && values.length > 0) {
            more = `WHERE ${this.CREATEEQUAL$AND(where.split(","))} ` + more
        }
        const q: string = `SELECT ${titles} FROM ${tableName} ${more}`
        return await this.Query(q, values)
    }
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
    async ADD(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `Titles`
         * 
         * table headers to add values ​​to
         * 
         * Note : The contents are a string separated by commas
         */
        titles: string,
        /**
         *  `values`
         * 
         * header values ​​to add
         */
        values: (string | number)[],
        /**
        *  `more`
        * 
        * optional query continuation
        */
        more: string = "RETURNING *;") {

        const q: string = `INSERT INTO ${tableName} (${titles}) VALUES (${this.CREATE$(titles.split(",").length)}) ${more}`
        return await this.Query(q, values)

    }
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
    async UPDATE(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `Titles`
         * 
         * table headers to update values ​​to
         * 
         * Note: this value also requires 'values' to be filled in
         * 
         * Note : The contents are a string separated by commas
         */
        titles: string,
        /**
         *  `where`
         * 
         * Which filters will be used to query?
         * 
         * Note: this value also requires 'values' to be filled in
         * 
         * Note: The contents are a string separated by commas
         */
        where: string,
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
        values: (string | number)[],
        /**
        *  `more`
        * 
        * optional query continuation
        */
        more: string = "RETURNING *;") {

        const t = titles.split(",")
        const w = where.split(",")
        const q: string = `UPDATE ${tableName} SET ${this.CREATEEQUAL$(t)} WHERE ${this.CREATEEQUAL$AND(w, t.length + 1)}  ${more}`
        return await this.Query(q, values)


    }
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
    async DEL(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `where`
         * 
         * Which filters will be used to query?
         * 
         * Note: this value also requires 'values' to be filled in
         * 
         * Note: The contents are a string separated by commas
         */
        where: string = "",
        /**
         *  `values`
         * 
         * header values ​​to update
         * 
         */
        values: (string | number)[] = [],
        /**
        *  `more`
        * 
        * optional query continuation
        */
        more: string = "RETURNING *;") {

        if (where !== "" && values.length > 0) {
            const w = where.split(",")
            more = `WHERE ${this.CREATEEQUAL$AND(w)} ` + more
        }
        const q = `DELETE FROM ${tableName} ${more}`
        return await this.Query(q, values)


    }
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
    async LISTDB(
        /**
         * `value`
         * 
         * NOTE: takes a single value
         * 
         * filter value
         */
        value: string = "",
        /**
         *  `Titles`
         * 
         * NOTE: takes a single value
         * 
         */
        titles: string = "datname",
        /**
         *  `where`
         * 
         * Which filters will be used to query 
         * 
         * NOTE: takes a single value
         * 
         * Note: this value also requires 'values' to be filled in
         */
        where: string = "datname",
    ) {
        const q: string = `SELECT ${titles} FROM pg_catalog.pg_database WHERE ${where} = '${value}'`
        return await this.Query(q)
    }
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
    async DELETEDB(
        /**
         *  `Database Name`
         */
        DBName: string
    ) {

        const q = `DROP DATABASE IF EXISTS ${DBName}`
        return await this.Query(q)

    }
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
    async CREATEDB(
        /**
         *  `Database Name`
         */
        DBName: string,
        /**
         *  `force status`
         * 
         * If the "force" value is true, the conflicting database is deleted and a new database with the same name is created.
         * 
         * NOTE : This action will delete all data in the database.
         */
        force: boolean = false
    ) {

        const rd: any = await this.LISTDB(DBName)
        if (rd.rowCount > 0) {
            if (force) {
                await this.DELETEDB(DBName)
                const q = `CREATE DATABASE ${DBName}`
                return await this.Query(q)
            } else {
                console.log("Database already exists")
                return rd.rows
            }
        } else {
            const q = `CREATE DATABASE ${DBName}`
            return await this.Query(q)
        }



    }
    //#endregion


    ///////////////////// TABLE METHODS \\\\\\\\\\\\\\\\\\\\\\\\

    //#region /// LISTTABLE \\\
    /**
     * ### LISTTABLE()
     * 
     * Runs a SELECT query based on the given table 
     * 
     * It creates a SELECT string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **titles**         | string         | `tablename` | Table headers of the values ​​to be listed
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.LISTTABLE("users")
     * ```
     * > convert `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema' AND tablename='user';`
     * 
     */
    async LISTTABLE(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
        *  `Titles`
        * 
        * Note : The contents are a string separated by commas
        */
        titles: string = "tablename"
    ) {
        // ${force?"":"IF NOT EXISTS"} 
        const q = `SELECT ${titles} FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema' AND tablename='${tableName}';`
        return await this.Query(q)
    }
    //#endregion

    //#region /// DELETETABLE \\\
    /**
     * ### DELETETABLE()
     * 
     * Runs a DELETE query based on the given table name
     * 
     * It creates a DELETE string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * 
     * 
     * ## WARNING : this function will deleted all datas of table
     * 
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Table name to be deleted
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.DELETETABLE("users")
     * ```
     * > convert `DELETE DROP users;`
     * 
     */
    async DELETETABLE(
        /**
         *  `Table Name`
         */
        TableName: string
    ) {
        const q = `DROP TABLE ${TableName};`
        return await this.Query(q)
    }
    //#endregion

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
     * | **columns**        | string         | `""`        | Columns properties to be created
     * | **force**          | boolean        | `false`     | Force table creation
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.CREATETABLE("users","user_id serial PRIMARY KEY , user_name VARCHAR(50) UNIQUE NOT NULL")
     * ```
     * > convert `CREATE TABLE users (user_id serial PRIMARY KEY , user_name VARCHAR(50) UNIQUE NOT NULL);`
     * 
     * ```ts
     * await RELPG.CREATETABLE("users","user_id INT NOT NULL , user_name VARCHAR(50) UNIQUE NOT NULL , PRIMARY KEY (user_id)")
     * ```
     * > convert `CREATE TABLE users (user_id INT NOT NULL , user_name VARCHAR(50) UNIQUE NOT NULL , PRIMARY KEY (user_id));`
     * 
     */
    async CREATETABLE(
        /**
         *  `Table Name`
         */
        TableName: string,
        /**
        *  `Columns`
        */
        columns: string,
        /**
         *  `force status`
         * 
         * If the "force" value is true, overwrites even if the table name to be created exists
         * 
         * NOTE : This action will delete all data in the table.
         */
        force: boolean = false
    ) {

        const rd: any = await this.LISTTABLE(TableName)
        if (rd.rowCount > 0) {
            if (force) {
                await this.DELETETABLE(TableName)
                const q = `CREATE TABLE ${TableName} (${columns});`
                return await this.Query(q)
            } else {
                console.log("Table already exists")
                return rd.rows
            }
        } else {
            const q = `CREATE TABLE ${TableName} (${columns});`
            return await this.Query(q)
        }


    }
    //#endregion

    //#region /// ALTERTABLE \\\
    /**
     * ### ALTERTABLE()
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **action**         | string         | `""`        | Columns properties to be updated or more (exp:constraint)
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.ALTERTABLE("users","ADD COLUMN user_name VARCHAR(100) NOT NULL")
     * ```
     * > convert `ALTER TABLE users ADD COLUMN user_name VARCHAR(100) NOT NULL;`
     * 
     */
    async ALTERTABLE(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `action`
         */
        action: string,
    ) {
        // ${force?"":"IF NOT EXISTS"} 
        const q = `ALTER TABLE ${tableName} ${action};`
        return await this.Query(q)
    }
    //#endregion

    //#region /// ADDCOLUMN \\\
    /**
     * ### ADDCOL()
     * 
     * #### Adds column to an existing table
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **columnName**     | string         | `""`        | column name to add
     * | **dataType**       | string         | `""`        | column data type to add
     * | **constraint**     | string         | `""`        | column constraint to add
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.ADDCOL("users","user_name","VARCHAR(100)")
     * ```
     * > convert `ALTER TABLE users ADD COLUMN user_name `
     * 
     */
    async ADDCOL(
        /**
         *  `Table Name`
         * 
         * Existing table name
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to add
         */
        columnName: string,
        /**
        *  `dataType`
        * 
        * column data type to add
        */
        dataType: string,
        /**
         *  `constraint`
         * 
         * column constraint to add
         */
        constraint: string="",
    ) {
        const actions = `ADD COLUMN ${columnName} ${dataType} ${constraint}`
        return await this.ALTERTABLE(tableName, actions)
    }
    //#endregion

    //#region /// DELCOLUMN \\\
    /**
     * ### DELCOL()
     * 
     * #### Deletes an existing column of an existing table
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **columnName**     | string         | `""`        | column name to delete
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.DELCOL("users","user_name")
     * ```
     * > convert `ALTER TABLE users DROP COLUMN user_name `
     * 
     */
    async DELCOL(
        /**
         *  `Table Name`
         * 
         * Existing table name
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to delete
         */
        columnName: string
    ) {
        const actions = `DROP COLUMN ${columnName}`
        return await this.ALTERTABLE(tableName, actions)
    }
    //#endregion

    //#region /// RENAMECOLUMN \\\
    /**
     * ### RENAMECOL()
     * 
     * #### change column name an existing column of an existing table
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **columnName**     | string         | `""`        | column name to update
     * | **newColumnName**  | string         | `""`        | column name to update
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.RENAMECOL("users","user_name","username")
     * ```
     * > convert `ALTER TABLE users RENAME COLUMN user_name TO username`
     * 
     */
    async RENAMECOL(
        /**
         *  `Table Name`
         * 
         * Existing table name
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to update
         */
        columnName: string,
        /**
        *  `newColumnName`
        * 
        * new column name to update
        */
        newColumnName: string
    ) {
        const actions = `RENAME COLUMN ${columnName} TO ${newColumnName}`
        return await this.ALTERTABLE(tableName, actions)
    }
    //#endregion

    //#region /// RENAMETABLE \\\
    /**
     * ### RENAMETABLE()
     * 
     * #### change table name of an existing table
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **newTableName**   | string         | `""`        | table name to update
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.RENAMETABLE("users","accounts")
     * ```
     * > convert `ALTER TABLE users RENAME TO accounts`
     * 
     */
    async RENAMETABLE(
        /**
         *  `Table Name`
         * 
         * Existing table name
         */
        tableName: string,
        /**
         *  `newTableName`
         * 
         * table name to update
         */
        newTableName: string
    ) {
        const actions = `RENAME TO ${newTableName}`
        return await this.ALTERTABLE(tableName, actions)
    }
    //#endregion

    //#region /// ALTERCOLUMN \\\
    /**
     * ### ALTERCOL()
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **columnName**     | string         | `""`        | column name to update
     * | **action**         | string         | `""`        | Columns properties to be updated or more (exp:constraint)
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * await RELPG.ALTERCOL("users","user_name","TYPE VARCHAR")
     * ```
     * > convert `ALTER TABLE users ALTER COLUMN user_name TYPE VARCHAR`
     * 
     */
    async ALTERCOL(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to update
         */
        columnName: string,
        /**
         *  `action`
         */
        action: string,
    ) {

        const actions = `ALTER COLUMN ${columnName} ${action}`
        return await this.ALTERTABLE(tableName, actions)
    }
    //#endregion

    //#region /// ALTERCOLUMNTYPE \\\
    /**
     * ### COLTYPE()
     * 
     * #### Changes columun datatype
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE           | DEFAULT     | DESCRIPTION
     * | :-                 | :-             | :-          | :-
     * | **tableName**      | string         | `""`        | Existing table name
     * | **columnName**     | string         | `""`        | column name to update
     * | **dataType**       | string         | `""`        | Columns data type to be updated
     * | **expression**     | string         | `""`        | expression for  USING tag
     * 
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * // username : VARCHAR
     * await RELPG.COLTYPE("users","user_name","TEXT")
     * ```
     * > convert `ALTER TABLE users ALTER COLUMN user_name TYPE VARCHAR`
     * 
     * ### NOTE 
     * 
     * The `USING` clause specifies an expression that allows you to convert the old values to the new ones.
     * 
     * ```ts
     * // user_id : int4
     * await RELPG.COLTYPE("users","user_id","INT") // ERROR
     * ```
     * 
     * ERROR:  column "user_id" cannot be cast automatically to type integer
     * 
     * HINT:  You might need to specify "USING user_id::integer".
     * 
     * ```ts
     * // user_id : int4
     * await RELPG.COLTYPE("users","user_id","INT","user_id::integer") // TRUE
     * ```
     * > convert `ALTER TABLE users ALTER COLUMN user_id TYPE INT USING asset_no::integer;`
     * 
     */
    async COLTYPE(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to update
         */
        columnName: string,
        /**
        *  `dataType`
        * 
        * column data type to update
        */
        dataType: string,
        /**
         *  `expression`
         * 
         *  expression for USING tag
         */
        expression: string = "",
    ) {

        const exp = expression === "" ? `` : `USING ${expression}`
        const actions = `TYPE ${dataType} ${exp}`

        return await this.ALTERCOL(tableName, columnName, actions)
    }
    //#endregion

    //#region /// ALTERCOLUMNSETDEFAULT \\\
    /**
     * ### COLDEFAULT()
     * 
     * #### Addes or Changes columun default value
     * 
     * Runs a ALTER query based on the given table 
     * 
     * It creates a ALTER string based on the parameter it receives and queries it with Query function.
     * > Return `result`
     * ---
     * 
     * ### Options
     * 
     * | OPTION             | TYPE            | DEFAULT     | DESCRIPTION
     * | :-                 | :-              | :-          | :-
     * | **tableName**      | string          | `""`        | Existing table name
     * | **columnName**     | string          | `""`        | column name to update
     * | **Default**        | string \| number | `""`        | Column default value to update
     * 
     * 
     * 
     * 
     * ---
     * 
     * ### Examples
     * ```ts
     * 
     * await RELPG.COLDEFAULT("users","user_name","'berk'")
     * ```
     * > convert `ALTER TABLE users ALTER COLUMN user_name SET DEFAULT 'berk'`
     * 
     * ##  NOTE :
     * Postgresql is sensitive to default values. If the any postgresql function will be used, write it directly, 
     * 
     * but if the default value will be a string expression, write it in ' '
     * 
     * ```ts
     * // string value
     * await RELPG.COLDEFAULT("users","user_name","'berk'") // TRUE
     * 
     * await RELPG.COLDEFAULT("users","user_name","berk")   // FALSE
     * 
     * // the any postgresql function
     * await RELPG.COLDEFAULT("users","user_name","CURRENT_DATE")   // TRUE
     * 
     * await RELPG.COLDEFAULT("users","user_name","'CURRENT_DATE'") // FALSE
     
     * ```
     */
    async COLDEFAULT(
        /**
         *  `Table Name`
         */
        tableName: string,
        /**
         *  `columnName`
         * 
         * column name to update
         */
        columnName: string,
        /**
        *  `Default`
        * 
        * column default value to update
        * 
        * ---
        * 
        * ##  NOTE :
        * Postgresql is sensitive to default values. If the any postgresql function will be used, write it directly, 
        * 
        * but if the default value will be a string expression, write it in ' '
        * 
        * ```ts
        * // string value
        * await RELPG.COLDEFAULT("users","user_name","'berk'") // TRUE
        * 
        * await RELPG.COLDEFAULT("users","user_name","berk")   // FALSE
        * 
        * // the any postgresql function
        * await RELPG.COLDEFAULT("users","user_name","CURRENT_DATE")   // TRUE
        * 
        * await RELPG.COLDEFAULT("users","user_name","'CURRENT_DATE'") // FALSE
        * 
        * ```
        */
        Default: string | number
    ) {

        const actions = `SET DEFAULT ${Default}`

        return await this.ALTERCOL(tableName, columnName, actions)
    }
    //#endregion


}

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