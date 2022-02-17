import { Schema, model } from 'mongoose'
import UsersModelStruct from "../Struct/UsersModelStruct";

const schema = new Schema<UsersModelStruct>({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    roles: [{type: String, ref: 'Role'}]
})

export default model('User', schema)