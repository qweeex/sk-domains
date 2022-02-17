import { Schema, model } from 'mongoose'
import RoleModelStruct from "../Struct/RoleModelStruct";

const schema = new Schema<RoleModelStruct>({
    value: {type: String, unique: true, default: "user"}
})

export default model('Role', schema)