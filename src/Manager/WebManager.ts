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
        this.ExpressCore.post('/auth/register', AuthController.RegistrationUser)
        this.ExpressCore.post('/auth/login', AuthController.LoginUser)

        // Domains API
        this.ExpressCore.get('/api/domains', RoleMiddleware('admin'), DomainsController.getAllDomains)
        this.ExpressCore.put('/api/domains', RoleMiddleware('admin'), DomainsController.changeDomains)
        this.ExpressCore.post('/api/domains', RoleMiddleware('admin'), DomainsController.addDomains)
        this.ExpressCore.delete('/api/domains', RoleMiddleware('admin'), DomainsController.deleteDomains)

        // Hosting info
        this.ExpressCore.get('/api/hosting/sites', RoleMiddleware('admin'), HostingControllers.getSitesOnHosting)

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

    public Start(): void {
        this.ExpressCore.listen(8081, () => {
            console.log('Server start')
        })
    }

}

export default WebManager