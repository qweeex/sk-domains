import express from "express"
import * as core from "express-serve-static-core"
import AuthController from "../Controller/AuthController";
import DomainsController from "../Controller/DomainsController";



class WebManager {
    public static readonly Instance: WebManager = new WebManager()
    private ExpressCore!: core.Express

    private constructor() {
        this.ExpressCore = express()
        // @ts-ignore
        this.ExpressCore.use(express.json())

        this.InitRouter()
    }


    private InitRouter(): void {
        // Auth API
        this.ExpressCore.post('/api/auth/register', AuthController.RegistrationUser)
        this.ExpressCore.post('/api/auth/login', AuthController.LoginUser)

        // Domains API
        this.ExpressCore.get('/api/domains', DomainsController.getAllDomains)
        this.ExpressCore.put('/api/domains', DomainsController.changeDomains)
        this.ExpressCore.post('/api/domains', DomainsController.addDomains)
        this.ExpressCore.delete('/api/domains', DomainsController.deleteDomains)
    }

    public Start(): void {
        this.ExpressCore.listen(8003, () => {
            console.log('Server start')
        })
    }

}

export default WebManager