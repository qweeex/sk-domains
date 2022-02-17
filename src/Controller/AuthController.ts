import express from "express";
import Users from "../Models/Users";
import Role from "../Models/Role";
import bcrypt from "bcrypt"

class AuthController{

    public static async registration(req: express.Request, res: express.Response){
        try {
            const {username, password} = req.body
            const candidate = await Users.findOne({username: username})
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким именем уже существует"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole: any = await Role.findOne({value: 'user'})
            const user = new Users({
                username: username,
                password: hashPassword,
                roles: [userRole.value]
            })
            await user.save()
            return res.json({
                message: "Пользователь успешно зарегистрирован"
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Auth err'
            })
        }
    }

    public static async login(req:express.Request, res:express.Response){
        try {
            const {username, password} = req.body
            const candidate = await Users.findOne({username: username})

            if (!candidate) {
                return res.status(401).json({status: false,message: "Пользователь с таким именем не найден"})
            }

            const validPassword = bcrypt.compareSync(password, candidate.password)

            if (!validPassword){
                return res.status(401).json({status: false,message: "Ошибка пароля"})
            }

            const token = generateAccessToken(candidate._id, candidate.roles)
            res.json({
                token: token,
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                message: 'Auth err'
            })
        }
    }

    public static async getUsers(req:express.Request, res:express.Response){
        try {
            const users = await Users.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

export default AuthController