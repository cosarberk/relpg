import { Pool } from "pg";





abstract class PG{
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
    db_host:string;
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
    db_port:number;
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
    db_user:string;
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
    db_name:string;
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
    db_password:string;

    constructor(
        db_host:string,db_port:number,db_user:string,db_name:string,db_password:string){
        this.db_host=db_host;
        this.db_name=db_name;
        this.db_password=db_password;
        this.db_port=db_port;
        this.db_user=db_user;
    }

    GetDBInfos(){
        return ` DB HOST : ${this.db_host} \n DB PORT : ${this.db_port} \n DB NAME : ${this.db_name} \n DB USER : ${this.db_user} \n DB PASS : ${this.db_password} \n` 
    }

    ConnectDb(){
        return  new Pool({
            user: this.db_user,
            host:this.db_host,
            database: this.db_name,
            password: this.db_password,
            port: this.db_port,
        })

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
export default class RelPg extends PG{
    db:any
    constructor(
        db_host:string="localhost",
        db_port:number=5432,
        db_user:string="postgres",
        db_name:string="postgres",
        db_password:string="1234"
        ){
            super(db_host,db_port,db_user,db_name,db_password);
            this.db=this.ConnectDb();
    }


    Connect(){
        return this.ConnectDb()
    }

    SELECT(){
        this.db.query('SELECT * FROM users',[],(err:any,res:any)=>{
            console.log(res)
        })
    }
}
