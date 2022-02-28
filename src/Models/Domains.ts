import MysqlManager from "../Manager/MysqlManager";
import DomainsInterface from "../Struct/DomainsInterface";

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

    async deleteDomain(idDomains: string): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "DELETE FROM `domains` WHERE `id` = ?",
                values: idDomains
            }, (err, domains) => {
                if (err){
                    reject(err)
                } else {
                    resolve(domains)
                }
            })
        })
    }
    
    async addDomains(domains: DomainsInterface): Promise<any>{
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

    async changeDomains(idDomains: string, domainsData: DomainsInterface): Promise<any>{
        console.log(idDomains)
        console.log(domainsData)
        return new Promise<any>(async (resolve, reject) => {
            await MysqlManager.Instance.MysqlPoolConnections.query('UPDATE `domains` SET ? WHERE  ?', [domainsData, {id: idDomains}], (err, results) => {
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