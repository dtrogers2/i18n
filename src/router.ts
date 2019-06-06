import express from 'express';
import {itnlConfig} from './itnlConfig';
import path from 'path';
import fs from 'fs';
import myFunction, { fileFromLocale } from './languageparse';
import {Logger} from '@mazemasterjs/logger';

export const router = express.Router();
const log = Logger.getInstance();
// load the service config
const config = itnlConfig.getInstance();

// map all of the common routes
router.get('/hello', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    res.send()
    return res;
  });

//Tester page, will give you a button to make a request for the appropriate text file for the browsers lanuage
  router.get('/language', (req, res) =>{
    const lang :string = req.header('accept-language') + "";
    const word = fileFromLocale(lang);
    var file = path.resolve(word);
    return res.sendFile(file);
    })
  
 
//Recieves the request to change the users language
  router.post('/send', (req, res) =>{
    var languages = JSON.stringify(req.body);
    log.force(__filename, 'router.post(/send): ', languages);
    res.end(myFunction(languages));
    var str = myFunction(languages);
    log.force(__filename, 'router.post(/send): ', str );
    return res;

  });

//Returns the text file
router.get('/getText', (req, res) =>{
    var mylang = JSON.stringify(req.body);
    log.force(__filename, 'router.get(/getText): ', mylang);
    var myfile = path.resolve(myFunction(mylang));
    log.force(__filename, 'router.post(/getText): ', myfile);
    return res.sendFile(myfile);

})