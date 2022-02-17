"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    value: { type: String, unique: true, "default": "user" }
});
exports["default"] = mongoose_1.model('Role', schema);
