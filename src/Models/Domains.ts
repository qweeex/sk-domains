import MysqlManager from "../Manager/MysqlManager";

interface DomainInterface {
    domain: string;
    paidDate: string;
    domainUrl: string;
    domainLogin: string;
    domainPass: string;
    hostUrl: string;
    hostLogin: string;
    hostPass: string;
    price: string;
    serviceHost: boolean;
    serviceDomain: boolean;
    active: boolean;
}

class Domains {

    // @ts-ignore
    async getAllDomains(): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "SELECT * FROM `domains`"
            }, (err, domains) => {
                if (err){
                    reject(err)
                } else {
                    resolve(domains)
                }
            })
        })
    }

    async findDomain(domains: string): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "SELECT * FROM `domains` WHERE `domain` = ?",
                values: domains
            }, (err, domains) => {
                if (err){
                    reject(err)
                } else {
                    resolve(domains)
                }
            })
        })
    }
    
    async addDomains(domains: DomainInterface): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query('INSERT INTO domains SET ?', domains, (err, results) => {
                if (err){
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }



}

export default new Domains()