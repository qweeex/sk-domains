import express from "express"
import * as core from "express-serve-static-core"
import AuthController from "../Controller/AuthController";
import DomainsController from "../Controller/DomainsController";
import RoleMiddleware from "../Middleware/RoleMiddleware";
import SendMailDomains from "../Service/SendMailDomains";
import cors from "cors";
import SendMailHosting from "../Service/SendMailHosting";
import HostingControllers from "../Controller/HostingControllers";



class WebManager {
    public static readonly Instance: WebManager = new WebManager()
    private ExpressCore!: core.Express

    private constructor() {
        this.ExpressCore = express()
        this.ExpressCore.use(express.json())
        this.ExpressCore.use(cors())
        this.ExpressCore.disable('x-powered-by')
        this.InitRouter()
    }


    private InitRouter(): void {
        // Auth API
        this.ExpressCore.post('/auth/login', AuthController.LoginUser)
        this.ExpressCore.post('/auth/token', RoleMiddleware('admin'), AuthController.GetTokenBot)

        // Domains API
        this.ExpressCore.get('/api/domains', RoleMiddleware('admin'), DomainsController.getAllDomains)
        this.ExpressCore.put('/api/domains', RoleMiddleware('admin'), DomainsController.changeDomains)
        this.ExpressCore.post('/api/domains', RoleMiddleware('admin'), DomainsController.addDomains)
        this.ExpressCore.post('/api/domains/info', RoleMiddleware('admin'), DomainsController.getCurrentDomains)
        this.ExpressCore.delete('/api/domains', RoleMiddleware('admin'), DomainsController.deleteDomains)

        // Hosting info
        this.ExpressCore.get('/api/hosting/sites', RoleMiddleware('admin'), HostingControllers.getSitesOnHosting)
        this.ExpressCore.get('/api/hosting/accounts', RoleMiddleware('admin'), HostingControllers.getAccountInfo)

        // Service
        this.ExpressCore.get('/api/mail/domains', async (req: express.Request, res:express.Response) => {
            await SendMailDomains.Instance.SendMail()
            return res.send('ok');
        })
        this.ExpressCore.get('/api/mail/hosting', async (req: express.Request, res:express.Response) => {
            await SendMailHosting.Instance.SendMail()
            return res.send('ok');
        })
    }

    public async mail(){
        await SendMailDomains.Instance.SendMail()
        await SendMailHosting.Instance.SendMail()
    }

    public async Start() {
        await this.mail()
        setInterval(async () => {
            await this.mail()
        }, 86400000)
        this.ExpressCore.listen(8081, () => {
            console.log('Server start')
        })
    }

}

export default WebManager