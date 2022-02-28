import express from "express"
import * as core from "express-serve-static-core"
import AuthController from "../Controller/AuthController";
import DomainsController from "../Controller/DomainsController";
import RoleMiddleware from "../Middleware/RoleMiddleware";
import SendMailDomains from "../Service/SendMailDomains";
import cors from "cors";



class WebManager {
    public static readonly Instance: WebManager = new WebManager()
    private ExpressCore!: core.Express

    private constructor() {
        this.ExpressCore = express()
        this.ExpressCore.use(express.json())
        this.ExpressCore.use(cors())
        this.InitRouter()
    }


    private InitRouter(): void {
        // Auth API
        this.ExpressCore.post('/api/auth/register', AuthController.RegistrationUser)
        this.ExpressCore.post('/api/auth/login', AuthController.LoginUser)

        // Domains API
        this.ExpressCore.get('/api/domains', RoleMiddleware('admin'), DomainsController.getAllDomains)
        this.ExpressCore.put('/api/domains', RoleMiddleware('admin'), DomainsController.changeDomains)
        this.ExpressCore.post('/api/domains', RoleMiddleware('admin'), DomainsController.addDomains)
        this.ExpressCore.delete('/api/domains', RoleMiddleware('admin'), DomainsController.deleteDomains)

        // Service
        // @ts-ignore
        this.ExpressCore.get('/api/mail', async (req: express.Request, res:express.Response) => {
            await SendMailDomains.Instance.SendMail()
            return res.json({
                status: true
            })
        })
    }

    public Start(): void {
        this.ExpressCore.listen(8081, () => {
            console.log('Server start')
        })
    }

}

export default WebManager