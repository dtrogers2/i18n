import express from 'express';
import {itnlConfig} from './itnlConfig';

export const router = express.Router();

// load the service config
const config = itnlConfig.getInstance();

// map all of the common routes
router.get('/hello', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    return res;
  })

