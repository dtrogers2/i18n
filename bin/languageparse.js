"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@mazemasterjs/logger");
const log = logger_1.Logger.getInstance();
function fileFromLocale(languages) {
    var mylang;
    var outfile;
    mylang = languages.substring(0, 2);
    log.force(__filename, 'fileFromLocale(): ', languages);
    log.force(__filename, 'fileFromLocale(): ', mylang);
    outfile = "./lang/" + mylang + ".json";
    return outfile;
}
exports.fileFromLocale = fileFromLocale;
exports.default = fileFromLocale;
//# sourceMappingURL=languageparse.js.map