import MysqlManager from "../Manager/MysqlManager";

class Hosting {

    // @ts-ignore
    async addAccount(login: string, pass: string){
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "INSERT INTO `hostings` SET ?",
                values: {
                    login: login,
                    password: pass
                }
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    async getAccounts() {
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "SELECT * FROM `hostings`",
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    async deleteAccount(idAccount: string){
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "DELETE FROM `hostings` WHERE `id` = ?",
                values: idAccount
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

}

export default new Hosting()