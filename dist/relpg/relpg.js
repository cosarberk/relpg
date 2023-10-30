class PG {
    constructor(db_host, db_port, db_user, db_name, db_password) {
        this.db_host = db_host;
        this.db_name = db_name;
        this.db_password = db_password;
        this.db_port = db_port;
        this.db_user = db_user;
    }
    GetDBInfos() {
        return `DB HOST : ${this.db_host} \n DB PORT : ${this.db_port} \n DB NAME : ${this.db_name} \n DB USER : ${this.db_user} \n DB PASS : ${this.db_password} \n`;
    }
}
class RelPg extends PG {
    constructor(db_host, db_port, db_user, db_name, db_password) {
        super(db_host, db_port, db_user, db_name, db_password);
    }
    C() {
        console.log("deneme");
    }
}
module.exports = RelPg;
//# sourceMappingURL=relpg.js.map