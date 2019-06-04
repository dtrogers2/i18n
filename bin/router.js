"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itnlConfig_1 = require("./itnlConfig");
exports.router = express_1.default.Router();
// load the service config
const config = itnlConfig_1.itnlConfig.getInstance();
// map all of the common routes
exports.router.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
    return res;
});
//# sourceMappingURL=router.js.map