"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    roles: [{ type: String, ref: 'Role' }]
});
exports["default"] = mongoose_1.model('User', schema);
