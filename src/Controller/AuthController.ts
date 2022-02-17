import express from "express";

class AuthController{

    public static async registration(req:express.Request, res:express.Response){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "ошибка регистрации",
                    errors
                })
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username: username})
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким именем уже существует"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'user'})
            const user = new User({
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
            const candidate = await User.findOne({username: username})

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
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

export default AuthController