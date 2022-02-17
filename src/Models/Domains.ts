import { Schema, model } from 'mongoose'
import DomainsModelStruct from "../Struct/DomainsModelStruct";

const schema = new Schema<DomainsModelStruct>({
    domain: {type: String, unique: true, require: true},
    paidDate: {type: String},
    domainUrl: {type: String},
    domainLogin: {type: String},
    domainPass: {type: String},
    hostUrl: {type: String},
    hostLogin: {type: String},
    hostPass: {type: String},
    price: {type: String},
    serviceHost: {type: Boolean, default: true},
    serviceDomain: {type: Boolean, default: true},
    active: {type: Boolean, default: true}
})

export default model('Domains', schema)