import express from "express"
import * as core from "express-serve-static-core"
import AuthController from "../Controller/AuthController";



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
        this.ExpressCore.post('/api/auth/register', AuthController.RegistrationUser)
        this.ExpressCore.post('/api/auth/login', AuthController.LoginUser)
    }

    public Start(): void {
        this.ExpressCore.listen(8003, () => {
            console.log('Server start')
        })
    }

}

export default WebManager