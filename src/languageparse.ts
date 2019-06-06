import path from 'path';
import fs from 'fs';
import { Logger } from '@mazemasterjs/logger';

const log = Logger.getInstance();

export function fileFromLocale(languages : string){
    var mylang : string;
    var outfile : string;
    mylang = languages.substring(0,2);
    
    log.force(__filename, 'fileFromLocale(): ',  languages );
    log.force(__filename, 'fileFromLocale(): ',  mylang );
    outfile = "./lang/" + mylang + ".json";
    return outfile;
}


export default fileFromLocale;