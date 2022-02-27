import axios from "axios"

class BegetApi {

    public static readonly API_URL: string = "https://api.beget.com/api"

    public static delay(): Promise<any>{
        return new Promise<any>((resolve => setTimeout(resolve, 300)))
    }

    public static async RequestInformation(login: string, pass: string): Promise<any>{
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

    public static async AccountInformation(): Promise<any>{
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data: any = []
                for (const item of HostData){
                    await this.RequestInformation(item.login, item.pass)
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

    public static async SitesList(login: string, pass: string){
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(this.API_URL + + `/site/getList?login=${login}&passwd=${pass}&output_format=json`)
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

export default BegetApi