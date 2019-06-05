import express from 'express';
import {itnlConfig} from './itnlConfig';
import path from 'path';
import fs from 'fs';

export const router = express.Router();

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
      var filename = path.resolve('./lang/langtest.html');
    return res.sendFile(filename);
  });
 
//Recieves the request to change the users language
  router.post('/send', (req, res) =>{
    var languages = JSON.stringify(req.body);
    var mylang : string;
    var infile : string;
    if (languages.includes('en')) {mylang = 'en'; infile = "./lang/" + mylang + ".txt";}
    else if (languages.includes('es')) {mylang = 'es'; infile = "./lang/" + mylang + ".txt";}
    else {mylang = 'en'; infile = "./lang/" + mylang + ".txt";}
    fs.copyFile(infile, './lang/text.txt', (err: any)=> {
        if (err) throw err;
        console.log(infile + ' was copied to text.txt');
    })
    return res;

  });

//Returns the text file
router.get('/getText', (req, res) =>{
    fs.readFile('./lang/text.txt', (err, data) => { 
        if (err) throw err; 
        res.end(data);
        res.send()
        return res;
    }) 

})