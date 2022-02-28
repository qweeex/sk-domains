import jwt from "jsonwebtoken";
import {secret} from "../Data/Config.json"
import express from "express";

export default (roles: string) => {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            if (req.headers.authorization){
                const token = req.headers.authorization.split(" ")[1]
                if (!token) {
                    return res.json({
                        status: false,
                        message: "Токен не найден"
                    })
                }
                // @ts-ignore
                const {roles: currentUser} = jwt.verify(token, secret)
                let hasRoles = false
                JSON.parse(currentUser).forEach((role: any) => {
                    if (roles.includes(role.value)){
                        hasRoles = true
                    }
                })
                if (!hasRoles){
                    return res.status(200).json({
                        status: false,
                        message: "Доступ запрещен"
                    })
                }
                next()
            } else {
                return res.json({status: false,message: "Ошибка проверки токена"})
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({status: false,message: "Глобальная ошибка проверки прав", error})
        }
    }
}