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
export default class RelPg extends PG {
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
    private CREATE$(num:number) {
        let b = ""
        for (let i = 0; i < num; i++) {
            i !== 0 ? b += ",$" + (i + 1) : b += "$" + 1

        }
        return b

    }
    private CREATEEQUAL$(titles:string[]) {
        let b = ""
        for (let i = 0; i < titles.length; i++) {
            i !== 0 ? b += "," + titles[i] + "=$" + (i + 1) : b += titles[i] + "=$" + 1

        }
        return b

    }
    private CREATEEQUAL$AND(titles:string[],plus:number=1) {
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
        titles: string="*",
        /**
         *  `where`
         * 
         * Which filters will be used to query when needed?
         * 
         * Note: this value also requires 'values' to be filled in
         */
        where: string="",
        /**
         *  `values`
         * 
         * filter values
         */
        values: (string | number)[]=[], 
         /**
         *  `more`
         * 
         * optional query continuation
         */
        more: string="") {
        if (where !=="" && values.length>0) {
            more =`WHERE ${this.CREATEEQUAL$AND(where.split(","))} `+ more
        } 
        const q: string = `SELECT ${titles} FROM ${tableName} ${more}`
        return await this.Query(q,values)
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
        titles: string="", 
        /**
         *  `values`
         * 
         * header values ​​to add
         */
        values: (string | number)[]=[], 
         /**
         *  `more`
         * 
         * optional query continuation
         */
        more: string="RETURNING *;") {

        const q:string = `INSERT INTO ${tableName} (${titles}) VALUES (${this.CREATE$(titles.split(",").length)}) ${more}`
        return await this.Query(q,values)

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
        titles: string="", 
        /**
         *  `where`
         * 
         * Which filters will be used to query?
         * 
         * Note: this value also requires 'values' to be filled in
         * 
         * Note: The contents are a string separated by commas
         */
        where: string="", 
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
        values: (string | number)[]=[], 
         /**
         *  `more`
         * 
         * optional query continuation
         */
        more: string="RETURNING *;") {

            const t = titles.split(",")
            const w = where.split(",")
            const q:string = `UPDATE ${tableName} SET ${this.CREATEEQUAL$(t)} WHERE ${this.CREATEEQUAL$AND(w,t.length+1)}  ${more}`
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
        where: string="", 
        /**
         *  `values`
         * 
         * header values ​​to update
         * 
         */
        values: (string | number)[]=[], 
         /**
         *  `more`
         * 
         * optional query continuation
         */
        more: string="RETURNING *;") {

            if (where !=="" && values.length>0) {
                const w = where.split(",")
                more =`WHERE ${this.CREATEEQUAL$AND(w)} `+ more
            } 
            const q = `DELETE FROM ${tableName} ${more}`
            return await this.Query(q,values)
    

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
        value: string ="", 
        /**
         *  `Titles`
         * 
         * NOTE: takes a single value
         * 
         */
        titles: string="datname",
        /**
         *  `where`
         * 
         * Which filters will be used to query 
         * 
         * NOTE: takes a single value
         * 
         * Note: this value also requires 'values' to be filled in
         */
        where: string ="datname",
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

            if (force) {
                await this.DELETEDB(DBName)
                const q = `CREATE DATABASE ${DBName}`
                return await this.Query(q)
             } else{
                 const rd:any = await this.LISTDB(DBName)
                 if (rd.rowCount>0) {
                     console.log("Database already exists")
                     return rd.rows
                 } else {
                    
                     const q = `CREATE DATABASE ${DBName}`
                     return await this.Query(q)
                 }
                 
             }

    }
//#endregion


///////////////////// TABLE METHODS \\\\\\\\\\\\\\\\\\\\\\\\


}

//#endregion

