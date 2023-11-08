# RelPg


Relpg is  postgresql query structure for Relteco RelNode/relqueryengine.



## RelPg

 It is the main class of the rel-query-engine module that supports Postgresql.
 
 ---
 
 ### Options
 
 | OPTION             | TYPE          | DEFAULT     | DESCRIPTION
 | :-                 | :-            | :-          | :-
 | **db_host**        | string        | `localhost` | Server address of postgresql database
 | **db_port**        | number        | `5432`      | Server port of postgresql database
 | **db_name**        | string        | `postgres`  | Postgresql database name
 | **db_user**        | string        | `postgres`  | Postgresql database user name
 | **db_password**    | string        | `1234`      | Postgresql database password
 
---
 ### Example:

 ```ts
 import { RelPg } from "relpg";
 
  const DB = new relpg("localhost",5432,"postgres","postgres","password")
```

OR

 ```ts
 const Relpg = require("relpg").RelPg;
 
  const DB = new Relpg("localhost",5432,"postgres","postgres","password")
```

Note: The localhost value assumes that Postgresql is installed on your system.



## MAIN QUERY 

### Query()
     
Runs the given query against the database with the given values
> Return `result`
---
     
### Options
     
| OPTION             | TYPE                        | DEFAULT     | DESCRIPTION
| :-                 | :-                          | :-          | :-
| **query**          | string                      | `""`        | query string
| **values**         | (string \| number)[]        | `[]`        | query table values
     
---
     
     
```ts   
  const result = await Query('SELECT * FROM WHERE id=$1',["aaaa-bbbb-cccc-dddd"])
```
  
  
## CRUD METHODS
  
### LIST()

Runs a SELECT query based on the given table name and table titles

It creates a SELECT string based on the parameters it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE                   | DEFAULT     | DESCRIPTION
| :-                 | :-                     | :-          | :-
| **tableName**      | string                 | `""`        | Table name to list
| **titles**         | string                 | `*`         | Table headers of the values ​​to be listed
| **where**          | string                 | `""`        | Query reference if any
| **values**         | (string \| number)[]   | `[]`        | Query reference values
| **more**           | string                 | `""`        | Query continuation if any



---

### Examples
```ts
await RELPG.LIST("users")
```
> convert `SELECT * FROM users`
 ```ts
await RELPG.LIST("users","uid,date")
```
> convert `SELECT uid,date FROM users`
 ```ts
await RELPG.LIST("users","*","user_phone,user_status",["+901111111111",1])
```
> convert `SELECT * FROM users WHERE user_phone=$1AND user_status=$2`
 ```ts
await RELPG.LIST("users","*","user_phone,user_status",["+901111111111",1],"ORDER BY uid ASC")
```
> convert `SELECT * FROM users WHERE user_phone=$1AND user_status=$2 ORDER BY uid ASC`

  
  
### ADD()

Runs a INSERT query based on the given table name and table titles

It creates a INSERT string based on the parameters it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
| :-                 | :-                     | :-              | :-
| **tableName**      | string                 | `""`            | Table name to add
| **titles**         | string                 | `""`            | Table headers of the values ​​to be added
| **values**         | (string \| number)[]   | `[]`            | Query reference values
| **more**           | string                 | `RETURNING *;`  | Query continuation if any 



---

### Examples
```ts
await RELPG.ADD("users","user_name,user_surname",["Berk","Coşar"])
```
> convert `INSERT INTO users (user_name,user_surname) VALUES ($1,$2) RETURNING *;`

  
### UPDATE()

Runs a UPDATE query based on the given table name and table titles

It creates a UPDATE string based on the parameters it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
| :-                 | :-                     | :-              | :-
| **tableName**      | string                 | `""`            | Table name to add
| **titles**         | string                 | `""`            | Table headers of the values ​​to be added
| **where**          | string                 | `""`            | Query reference if any
| **values**         | (string \| number)[]   | `[]`            | Query reference values
| **more**           | string                 | `RETURNING *;`  | Query continuation if any



---

### Examples

```ts

await RELPG.UPDATE("users","user_name","uid",["Berk","aaa-bbb-ccc"])

```
> convert `UPDATE users SET user_name=$1 WHERE uid=$2  RETURNING *;`

```ts

await RELPG.UPDATE("users","user_name,user_surname","uid,user_surname",["Berk","Coşar","aaa-bbb-ccc","Coşar"])

```
> convert `UPDATE users SET user_name=$1,user_surname=$2 WHERE uid=$3 AND user_surname=$4  RETURNING *;`

  
  
  
### DEL()

Runs a DELETE query based on the given table name and table titles

It creates a DELETE string based on the parameters it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
| :-                 | :-                     | :-              | :-
| **tableName**      | string                 | `""`            | Table name that owns the row to be deleted
| **where**          | string                 | `""`            | Query reference 
| **values**         | (string \| number)[]   | `[]`            | Query reference values
| **more**           | string                 | `RETURNING *;`  | Query continuation if any

---

### Examples

```ts

await RELPG.DEL("users")

```
> convert `DELETE FROM users RETURNING *;`

```ts

 await RELPG.DEL("users","uid",["aaa-bbb-ccc-ddd"])

```
> convert `DELETE FROM users WHERE uid=$1 RETURNING *;`
 
```ts

 await RELPG.DEL("users","user_name,user_surname",["Berk","Coşar"])

```
> convert `DELETE FROM users WHERE user_name=$1 AND user_surname=$2 RETURNING *;`



## DATABASE METHODS

### LISTDB()

Runs a SELECT query based on the given database infos

It creates a SELECT string based on the parameters it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE        | DEFAULT     | DESCRIPTION
| :-                 | :-          | :-          | :-
| **titles**         | string      | `datname`   | database headers of the values ​​to be listed
| **where**          | string      | `datname`   | Query reference 
| **value**          | string      | `""`        | Query reference values



---

### Examples
```ts
await RELPG.LISTDB("postgres")
```
> convert `SELECT datname FROM pg_catalog.pg_database WHERE datname = 'postgres'`

  
### DELETEDB()

Runs a DELETE query based on the given database name

It creates a DELETE string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **DBName**         | string         | `""`        | Database name to be deleted



---

### Examples
```ts
await RELPG.DELETEDB("postgres")
```
> convert `DROP DATABASE IF EXISTS postgres`

  
  
### CREATEDB()

Runs a CREATE query based on the given database name

It creates a CREATE string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **DBName**         | string         | `""`        | Database name to be created
| **force**          | boolean        | `false`     | Force database creation



---

### Examples
```ts
await RELPG.CREATEDB("postgres")
```
> convert `CREATE DATABASE postgres`

  
## TABLE METHODS

### LISTTABLE()

Runs a SELECT query based on the given table 

It creates a SELECT string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **titles**         | string         | `tablename` | Table headers of the values ​​to be listed



---

### Examples
```ts
await RELPG.LISTTABLE("users")
```
> convert `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema' AND tablename='user';`
     
  
### DELETETABLE()

Runs a DELETE query based on the given table name

It creates a DELETE string based on the parameter it receives and queries it with Query function.
> Return `result`


## WARNING : this function will deleted all datas of table

---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Table name to be deleted



---

### Examples
```ts
await RELPG.DELETETABLE("users")
```
> convert `DELETE DROP users;`

  
  
### CREATETABLE()

Runs a CREATE query based on the given table name

It creates a CREATE string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Table name to be created
| **columns**        | string         | `""`        | Columns properties to be created
| **force**          | boolean        | `false`     | Force table creation



---

### Examples
```ts
await RELPG.CREATETABLE("users","user_id serial PRIMARY KEY , user_name VARCHAR(50) UNIQUE NOT NULL")
```
> convert `CREATE TABLE users (user_id serial PRIMARY KEY , user_name VARCHAR(50) UNIQUE NOT NULL);`

```ts
await RELPG.CREATETABLE("users","user_id INT NOT NULL , user_name VARCHAR(50) UNIQUE NOT NULL , PRIMARY KEY (user_id)")
```
> convert `CREATE TABLE users (user_id INT NOT NULL , user_name VARCHAR(50) UNIQUE NOT NULL , PRIMARY KEY (user_id));`

  
  
  
### ALTERTABLE()

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **action**         | string         | `""`        | Columns properties to be updated or more (exp:constraint)



---

### Examples
```ts
await RELPG.ALTERTABLE("users","ADD COLUMN user_name VARCHAR(100) NOT NULL")
```
> convert `ALTER TABLE users ADD COLUMN user_name VARCHAR(100) NOT NULL;`


### ADDCOL()

#### Adds column to an existing table

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **columnName**     | string         | `""`        | column name to add
| **dataType**       | string         | `""`        | column data type to add
| **constraint**     | string         | `""`        | column constraint to add



---

### Examples
```ts
await RELPG.ADDCOL("users","user_name","VARCHAR(100)")
```
> convert `ALTER TABLE users ADD COLUMN user_name `



### DELCOL()

#### Deletes an existing column of an existing table

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **columnName**     | string         | `""`        | column name to delete



---

### Examples
```ts
await RELPG.DELCOL("users","user_name")
```
> convert `ALTER TABLE users DROP COLUMN user_name `


### RENAMECOL()

#### change column name an existing column of an existing table

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **columnName**     | string         | `""`        | column name to update
| **newColumnName**  | string         | `""`        | column name to update



---

### Examples
```ts
await RELPG.RENAMECOL("users","user_name","username")
```
> convert `ALTER TABLE users RENAME COLUMN user_name TO username`


### RENAMETABLE()

#### change table name of an existing table

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **newTableName**   | string         | `""`        | table name to update



---

### Examples
```ts
await RELPG.RENAMETABLE("users","accounts")
```
> convert `ALTER TABLE users RENAME TO accounts`


### ALTERCOL()

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **columnName**     | string         | `""`        | column name to update
| **action**         | string         | `""`        | Columns properties to be updated or more (exp:constraint)



---

### Examples
```ts
await RELPG.ALTERCOL("users","user_name","TYPE VARCHAR")
```
> convert `ALTER TABLE users ALTER COLUMN user_name TYPE VARCHAR`


### COLTYPE()

#### Changes columun datatype

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE           | DEFAULT     | DESCRIPTION
| :-                 | :-             | :-          | :-
| **tableName**      | string         | `""`        | Existing table name
| **columnName**     | string         | `""`        | column name to update
| **dataType**       | string         | `""`        | Columns data type to be updated
| **expression**     | string         | `""`        | expression for  USING tag




---

### Examples
```ts
// username : VARCHAR
await RELPG.COLTYPE("users","user_name","TEXT")
```
> convert `ALTER TABLE users ALTER COLUMN user_name TYPE VARCHAR`

### NOTE 

The `USING` clause specifies an expression that allows you to convert the old values to the new ones.

```ts
// user_id : int4
await RELPG.COLTYPE("users","user_id","INT") // ERROR
```

ERROR:  column "user_id" cannot be cast automatically to type integer

HINT:  You might need to specify "USING user_id::integer".

```ts
// user_id : int4
await RELPG.COLTYPE("users","user_id","INT","user_id::integer") // TRUE
```
> convert `ALTER TABLE users ALTER COLUMN user_id TYPE INT USING asset_no::integer;`


### COLDEFAULT()

#### Addes or Changes columun default value

Runs a ALTER query based on the given table 

It creates a ALTER string based on the parameter it receives and queries it with Query function.
> Return `result`
---

### Options

| OPTION             | TYPE            | DEFAULT     | DESCRIPTION
| :-                 | :-              | :-          | :-
| **tableName**      | string          | `""`        | Existing table name
| **columnName**     | string          | `""`        | column name to update
| **Default**        | string \| number | `""`        | Column default value to update




---

### Examples
```ts

await RELPG.COLDEFAULT("users","user_name","'berk'")
```
> convert `ALTER TABLE users ALTER COLUMN user_name SET DEFAULT 'berk'`

##  NOTE :
Postgresql is sensitive to default values. If the any postgresql function will be used, write it directly, 

but if the default value will be a string expression, write it in ' '

```ts
// string value
await RELPG.COLDEFAULT("users","user_name","'berk'") // TRUE

await RELPG.COLDEFAULT("users","user_name","berk")   // FALSE

// the any postgresql function
await RELPG.COLDEFAULT("users","user_name","CURRENT_DATE")   // TRUE

await RELPG.COLDEFAULT("users","user_name","'CURRENT_DATE'") // FALS
```