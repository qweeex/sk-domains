import express from "express";
import BegetApi from "../Api/BegetApi";

class HostingControllers {

    async getSitesOnHosting(req: express.Request, res: express.Response){
        try {
            await BegetApi.getSites().then(data => {
                return res.json({
                    status: true,
                    data
                })
            })
        } catch (error) {
            console.log(error)
            return res.json({
                status: false,
                message: "Error get sites",
                error
            })
        }
    }

    async getAccountInfo(req: express.Request, res: express.Response){
        try {

            await BegetApi.AccountInformation().then((data) => {
                res.json({
                    status: true,
                    data
                })
            })

        } catch (error) {
            console.log(error)
            return res.json({
                status: false,
                message: "Error get sites",
                error
            })
        }
    }

}
export default new HostingControllers()