import express from "express";
import Domains from "../Models/Domains";
import DomainsInterface from "../Struct/DomainsInterface";


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
    async getCurrentDomains(req: express.Request, res: express.Response){
        try {
            const {id} = req.body
            const domain = await Domains.findDomain(id)
            return res.json({
                status: true,
                domain
            })
        } catch (error){
            console.log(error)
            return res.json({
                status: false,
                error
            })
        }
    }
    async changeDomains(req: express.Request, res: express.Response) {
        try {

            const { id, domain, paidDate, domainUrl, domainLogin, domainPass, hostUrl, hostLogin, hostPass, price, serviceHost, serviceDomain, active }  = req.body
            await Domains.findDomain(domain).then(async (dom) => {
                if (dom.length > 0){
                    let currentDomains: DomainsInterface = {
                        domain: domain,
                        paidDate: paidDate,
                        domainUrl: domainUrl,
                        domainLogin: domainLogin,
                        domainPass: domainPass,
                        hostUrl: hostUrl,
                        hostLogin: hostLogin,
                        hostPass: hostPass,
                        price: price,
                        serviceHost: serviceHost,
                        serviceDomain: serviceDomain,
                        active: active,
                    }
                    await Domains.changeDomains(id, currentDomains).then((result) => {
                        return res.json({
                            status: true,
                            message: "Домен успешно изменен",
                            result
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "Такой домен не найден"
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
    async deleteDomains(req: express.Request, res: express.Response) {
        try {
            const { id } = req.body
            await Domains.deleteDomain(id).then((data) => {
                return res.json({
                    status: true,
                    message: "Домен удален",
                    data
                })
            })
        } catch (error) {
            return res.json({
                status: false,
                error
            })
        }
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