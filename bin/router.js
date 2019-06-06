"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itnlConfig_1 = require("./itnlConfig");
const path_1 = __importDefault(require("path"));
const languageparse_1 = __importStar(require("./languageparse"));
const logger_1 = require("@mazemasterjs/logger");
exports.router = express_1.default.Router();
const log = logger_1.Logger.getInstance();
// load the service config
const config = itnlConfig_1.itnlConfig.getInstance();
// map all of the common routes
exports.router.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
    res.send();
    return res;
});
//Tester page, will give you a button to make a request for the appropriate text file for the browsers lanuage
exports.router.get('/language', (req, res) => {
    const lang = req.header('accept-language') + "";
    const word = languageparse_1.fileFromLocale(lang);
    var file = path_1.default.resolve(word);
    return res.sendFile(file);
});
//Recieves the request to change the users language
exports.router.post('/send', (req, res) => {
    var languages = JSON.stringify(req.body);
    log.force(__filename, 'router.post(/send): ', languages);
    res.end(languageparse_1.default(languages));
    var str = languageparse_1.default(languages);
    log.force(__filename, 'router.post(/send): ', str);
    return res;
});
//Returns the text file
exports.router.get('/getText', (req, res) => {
    var mylang = JSON.stringify(req.body);
    log.force(__filename, 'router.get(/getText): ', mylang);
    var myfile = path_1.default.resolve(languageparse_1.default(mylang));
    log.force(__filename, 'router.post(/getText): ', myfile);
    return res.sendFile(myfile);
});
//# sourceMappingURL=router.js.map