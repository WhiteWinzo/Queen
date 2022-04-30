/*
 ██████╗ ██╗   ██╗███████╗███████╗███╗   ██╗    ██████╗  ██████╗ ████████╗
██╔═══██╗██║   ██║██╔════╝██╔════╝████╗  ██║    ██╔══██╗██╔═══██╗╚══██╔══╝
██║   ██║██║   ██║█████╗  █████╗  ██╔██╗ ██║    ██████╔╝██║   ██║   ██║   
██║▄▄ ██║██║   ██║██╔══╝  ██╔══╝  ██║╚██╗██║    ██╔══██╗██║   ██║   ██║   
╚██████╔╝╚██████╔╝███████╗███████╗██║ ╚████║    ██████╔╝╚██████╔╝   ██║   
 ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝    ╚═════╝  ╚═════╝    ╚═╝   
Codded by @DarkWinzo                                                             
Telegram: https://t.me/DarkWinzo                                                        
Whatsapp: https://Wa.me/+94705193038
Instagram:https://www.instagram.com/darkwinzo
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsApp bot - Isuru Lakshan
*/


const Config = require('./config');
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./language/' + Config.LANG + '.json')) {
    console.log(
        chalk.green.bold('Loading ' + Config.LANG + ' language...')
    );

    var json = JSON.parse(fs.readFileSync('./language/' + Config.LANG + '.json'));
} else {
    console.log(
        chalk.red.bold('ඔබ අවලංගු භාෂාවක් ඇතුළු කළා. සිංහල භාෂාව තෝරා ගත්තා.')
    );

    var json = JSON.parse(fs.readFileSync('./language/SI.json'));
}

function getString(file) {
    return json['STRINGS'][file];
}

module.exports = {
    language: json,
    getString: getString
}
