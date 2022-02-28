import MysqlManager from "../Manager/MysqlManager";

class Setting {

    async getSetting(name: string) {
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "SELECT value FROM `settings` WHERE `system_name` = ?",
                values: name
            }, (err, data) => {
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

}

export default new Setting()