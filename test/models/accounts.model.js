export const account = {
    table: {
        name: "users",
        Constraints: "",
        Force:false
    }
,
    columns: [
        {
            field: "user_id",
            datatype: "serial",
            Constraints: "PRIMARY KEY"
        },
        {
            field: "user_name",
            datatype: "VARCHAR(50)",
            Constraints: "UNIQUE NOT NULL"
        },
        {
            field: "user_password",
            datatype: "VARCHAR(50)",
            Constraints: "NOT NULL"
        },
        {
            field: "created_on",
            datatype: "TIMESTAMP",
            Constraints: "NOT NULL"
        },
        {
            field: "last_login",
            datatype: "TIMESTAMP",
            Constraints: ""
        }
    ]
}