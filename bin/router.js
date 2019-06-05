"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itnlConfig_1 = require("./itnlConfig");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.router = express_1.default.Router();
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
    var filename = path_1.default.resolve('./lang/langtest.html');
    return res.sendFile(filename);
});
//Recieves the request to change the users language
exports.router.post('/send', (req, res) => {
    var languages = JSON.stringify(req.body);
    var mylang;
    var infile;
    if (languages.includes('en')) {
        mylang = 'en';
        infile = "./lang/" + mylang + ".txt";
    }
    else if (languages.includes('es')) {
        mylang = 'es';
        infile = "./lang/" + mylang + ".txt";
    }
    else {
        mylang = 'en';
        infile = "./lang/" + mylang + ".txt";
    }
    fs_1.default.copyFile(infile, './lang/text.txt', (err) => {
        if (err)
            throw err;
        console.log(infile + ' was copied to text.txt');
    });
    return res;
});
//Returns the text file
exports.router.get('/getText', (req, res) => {
    fs_1.default.readFile('./lang/text.txt', (err, data) => {
        if (err)
            throw err;
        res.end(data);
        res.send();
        return res;
    });
});
//# sourceMappingURL=router.js.map