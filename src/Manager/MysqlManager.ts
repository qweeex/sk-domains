import {createPool, Pool} from "mysql"
import MysqlDatabaseSettingLineType from "../Struct/MysqlDatabaseSettingLineType";


class MysqlManager {

    public static readonly Instance: MysqlManager = new MysqlManager()
    public MysqlPoolConnections: Pool
    private MysqlCurrentSetting: MysqlDatabaseSettingLineType;

    private constructor() {

        this.MysqlCurrentSetting = {
            host: 'adminsdw.beget.tech',
            user: 'adminsdw_domains',
            pass: 'nSAUb&9%',
            base: 'adminsdw_domains'
        }

        this.MysqlPoolConnections = createPool({
            connectionLimit: 10,
            host: this.MysqlCurrentSetting.host,
            user: this.MysqlCurrentSetting.user,
            password: this.MysqlCurrentSetting.pass,
            database: this.MysqlCurrentSetting.base,
            charset: 'utf8mb4'
        })

        this.MysqlPoolConnections.on('error', (err) => {
            console.error(err)
        })

        this.MysqlPoolConnections.query('SET NAMES utf8mb4')

    }

}

export default MysqlManager