export const account_roles = {
    table: {
        name: "account_roles",
        Constraints: "PRIMARY KEY (user_id, role_id),FOREIGN KEY (role_id) REFERENCES roles (role_id),FOREIGN KEY (user_id) REFERENCES accounts (user_id)",
        Force:false
    }
,
    columns: [
        {
            field: "user_id",
            datatype: "INT",
            Constraints: "NOT NULL"
        },
        {
            field: "role_id",
            datatype: "INT",
            Constraints: "NOT NULL"
        },
        {
            field: "grant_date",
            datatype: "TIMESTAMP",
            Constraints: ""
        }
    ]
}