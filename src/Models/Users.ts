import MysqlManager from "../Manager/MysqlManager";

interface User {
    username: string;
    password: string;
    roles: string;
}

class Users {

    // @ts-ignore
    async findUser(username: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: 'SELECT * FROM `users` WHERE `username` = ?',
                values: username
            }, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
    }

    async findRole(role: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: 'SELECT * FROM `role` WHERE `value` = ?',
                values: role
            }, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
    }

    async createUser(user: { password: string; roles: string; username: any }): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query('INSERT INTO users SET ?', user, (err, results) => {
                if (err){
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }

}
export default new Users()