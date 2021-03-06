import express from "express";
import MysqlManager from "../Manager/MysqlManager";
import Users from "../Models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secret} from "../Data/Config.json"
import Setting from "../Models/Setting";

class AuthController {

    // @ts-ignore
    async RegistrationUser(req: express.Request, res: express.Response){

        const {username, password} = req.body

        if (username != '' && password != ''){
            try {
                await Users.findUser(username).then(async (currentUser) => {
                    if (currentUser.length === 0){
                        await Users.findRole('admin').then(async (role) => {
                            const hashPassword = bcrypt.hashSync(password, 10)
                            await Users.createUser({
                                username: username,
                                password: hashPassword,
                                roles: JSON.stringify(role)
                            })
                                .then((newUser) => {
                                    return res.json({
                                        status: true,
                                        newUser
                                    })
                                })
                        })
                    }
                })
            } catch (e) {
                console.error(e)
                return res.json({
                    status: false,
                    err: e
                })
            }
        } else {
            res.json({
                status: false,
                message: 'Username or password is empty'
            })
        }
    }

    async LoginUser(req: express.Request, res: express.Response){
        try {
            const {username, password} = req.body

            await Users.findUser(username)
                .then(user => {
                    if (user.length > 0){
                        const validPassword = bcrypt.compareSync(password, user[0].password)
                        if (!validPassword){
                            return res.json({
                                status: false,
                                message: "Err password"
                            })
                        }
                        const token = jwt.sign({
                            id: user[0].id,
                            roles: user[0].roles
                        }, secret, {
                            expiresIn: "10h"
                        })
                        return res.json({
                            status: true,
                            token: token,
                            roles: JSON.parse(user[0].roles)
                        })

                    } else {
                        return res.json({
                            status: false,
                            message: "User is not detect"
                        })
                    }
                })
        } catch (e) {
            console.error(e)
            return res.json({
                status: false,
                err: e
            })
        }
    }

    async GetTokenBot(req: express.Request, res: express.Response){
        try {

            const data = await Setting.getSetting('discord_token')
            return res.json({
                status: true,
                token: data[0].value
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

export default new AuthController()