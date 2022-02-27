import express from "express";
import Domains from "../Models/Domains";

class DomainsController{

    // @ts-ignore
    async addDomains(req: express.Request, res: express.Response) {
        try {

            const { domain }  = req.body
            await Domains.findDomain(domain).then(async (dom) => {
                if (dom.length < 1){
                    await Domains.addDomains(req.body).then((result) => {
                        return res.json({
                            status: true,
                            message: "Домен успешно добавлен",
                            result
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "Такой домен уже существует"
                    })
                }
            })

        } catch (error) {
            console.log(error)
            return res.json({
                status: false,
                error
            })
        }
    }

    changeDomains(req: express.Request, res: express.Response) {

    }
    deleteDomains(req: express.Request, res: express.Response) {

    }
    async getAllDomains(req: express.Request, res: express.Response) {
        try {
            await Domains.getAllDomains().then(result => {
                return res.json({
                    status: true,
                    result
                })
            })
        } catch (error) {
            console.error(error)
            return res.json({
                status: false,
                error
            })
        }
    }

}

export default new DomainsController()