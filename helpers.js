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


function successfullMessage(msg) {
    return "✅ *QUEEN*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *QUEEN*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *QUEEN*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
