import express from "express"
import * as core from "express-serve-static-core"


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
        this.ExpressCore.get('/', (req: express.Request, res: express.Response) => {
            res.send('asd')
        })
    }

    public Start(): void {
        this.ExpressCore.listen(8080)
    }

}

export default WebManager