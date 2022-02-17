"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var AuthController_1 = __importDefault(require("../Controller/AuthController"));
var WebManager = /** @class */ (function () {
    function WebManager() {
        this.ExpressCore = express_1["default"]();
        // @ts-ignore
        this.ExpressCore.use(express_1["default"].json());
        this.InitRouter();
    }
    WebManager.prototype.InitRouter = function () {
        this.ExpressCore.post('/api/auth/registration', AuthController_1["default"].registration);
        this.ExpressCore.post('/api/auth/login', AuthController_1["default"].login);
    };
    WebManager.prototype.Start = function () {
        this.ExpressCore.listen(8003, function () {
            console.log('Server start');
        });
    };
    WebManager.Instance = new WebManager();
    return WebManager;
}());
exports["default"] = WebManager;
