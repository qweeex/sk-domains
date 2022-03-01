import axios from "axios"
import Hosting from "../Models/Hosting";

class BegetApi {

    public readonly API_URL: string = "https://api.beget.com/api"
    public accounts!: any


    constructor() {
        this.getAccounts()
    }

    public async getAccounts(){
        try {
            await Hosting.getAccounts()
                .then((data) => this.accounts = data)
        } catch (e) {
            console.error(e)
        }
    }


    public delay(): Promise<any>{
        return new Promise<any>((resolve => setTimeout(resolve, 300)))
    }

    public async RequestInformation(login: string, pass: string): Promise<any>{
        await this.delay()
        return new Promise(async (resolve, reject) => {
            await axios.post(this.API_URL + '/user/getAccountInfo?login='+encodeURIComponent(login)+'&passwd='+encodeURIComponent(pass)+'&output_format=json&input_data=json')
                .then((res) => {
                    if (res.data.status === 'success'){
                        let data = res.data.answer.result
                        resolve({
                            host: login,
                            user_days_to_block: data.user_days_to_block,
                            user_sites: data.user_sites,
                            plan_site: data.plan_site
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    public async AccountInformation(): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data: any = []
                for (const item of this.accounts){
                    await this.RequestInformation(item.login, item.password)
                        .then((res) => {
                            data.push(res)
                        })
                }
                resolve(data)
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

    public async getSites() : Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data: any = []
                for (const item of this.accounts){
                    await this.getSitesOnAccounts(item.login, item.password)
                        .then((result) => {
                            data.push({
                                host: item.login,
                                data: result.answer.result
                            })
                        })
                }
                resolve(data)
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

    public async getSitesOnAccounts(login: string, pass: string){
        await this.delay()
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(this.API_URL + `/site/getList?login=${encodeURIComponent(login)}&passwd=${encodeURIComponent(pass)}&output_format=json`)
                    .then((res) => { resolve(res.data) })
                    .catch((err) => {
                        console.log(err)
                        reject(err)
                    })
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }


}

export default new BegetApi()