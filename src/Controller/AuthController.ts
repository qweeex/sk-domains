import express from "express";
import MysqlManager from "../Manager/MysqlManager";
import Users from "../Models/Users";

class AuthController {

    // @ts-ignore
    async RegistrationUser(req: express.Request, res: express.Response){

        const {username, password} = req.body

        if (username != '' && password != ''){
            await MysqlManager.Instance.MysqlPoolConnections.query({
                sql: "SELECT * FROM `role`"
            }, async (error, data) => {
                if (error) throw error;
                let user = {
                    username: username,
                    password: password,
                    roles: JSON.stringify(data)
                }
                await MysqlManager.Instance.MysqlPoolConnections.query('INSERT INTO users SET ?', user, (err, results, fields) => {
                    if (err){
                        res.json({
                            status: false,
                            err
                        })
                    } else {
                        res.json({
                            status: true,
                            results
                        })
                    }
                })
            })
        } else {
            res.json({
                status: false,
                message: 'Username or password is empty'
            })
        }


        /*await MysqlManager.Instance.MysqlPoolConnections.query({
            sql: 'INSERT INTO users` (`id`, `username`, `password`, `roles`) VALUES ?'
        })*/
    }

    async LoginUser(req: express.Request, res: express.Response){

        const {username, password} = req.body

        await Users.findUser(username)
            .then(user => {
                if (user.length > 0){

                }
                res.json({
                    status: true,
                    user
                })
            })
            .catch(err => {
                res.json({
                    status: false,
                    err
                })
            })

    }

}

export default new AuthController()