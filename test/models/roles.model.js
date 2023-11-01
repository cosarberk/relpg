export const roles = {
    table: {
        name: "roles",
        Constraints: "",
        Force:false
    }
,
    columns: [
        {
            field: "role_id",
            datatype: "serial",
            Constraints: "PRIMARY KEY"
        },
        {
            field: "role_name",
            datatype: "VARCHAR(255)",
            Constraints: "UNIQUE NOT NULL"
        }
    ]
}