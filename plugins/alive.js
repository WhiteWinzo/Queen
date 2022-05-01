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

const Queen = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');
const chalk = require('chalk');
const axios = require('axios');
let wk = Config.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('system_stats');




    Queen.addCommand({pattern: 'alive', fromMe: wk, desc: Lang.ALIVE_DESC, deleteCommand: false }, (async (message, match) => {
       if (Config.ALIVE_STIC == 'default') {
       const sticker = await axios.get('https://i.ibb.co/XkWhjLh/Nt-OOzj-C3-HBAB.webp', {responseType: 'arraybuffer'})
       await message.client.sendMessage (message.jid, Buffer.from (sticker.data), MessageType.sticker, {quoted: message.data} )
       }else { if (!Config.ALIVE_STIC.includes('webp')){
        const sticker = await axios.get('https://i.ibb.co/XkWhjLh/Nt-OOzj-C3-HBAB.webp', {responseType: 'arraybuffer'})
       await message.client.sendMessage (message.jid, Buffer.from (sticker.data), MessageType.sticker, {quoted: message.data} )
    }else{
             const sticker = await axios.get(Config.ALIVE_STIC, {responseType: 'arraybuffer'})
            await message.client.sendMessage (message.jid, Buffer.from (sticker.data), MessageType.sticker, {quoted: message.data} )                                        
                                                                                                   }}
                                                                                                   
                                                                                                   
        
        var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }

        if (Config.ALIVEMSG == 'default') {
            
        var aliveimg = await axios.get (Config.ALIVE_LOGO, {responseType: 'arraybuffer'})

        await message.client.sendMessage (message.jid, Buffer.from (aliveimg.data), MessageType.image, {mimetype: Mimetype.png, caption: '┌───[▀▄▀▄▀▄ Qᴜᴇᴇɴ ʙᴏᴛ ▄▀▄▀▄▀]\n\n│```👋Hey, I\'m online now```\n\n│ ```🍎Type``` ' + HANDLER + Config. CUS_PANEL + ' ```to get command list🍎```\n\n│ 🍎Version: ```'  + Config. VERSION + '```\n\n└─────────────◉',quoted: message.data })

    }
    else {
            
            var image = await axios.get (Config.ALIVE_LOGO, {responseType: 'arraybuffer'})
       
        await message.client.sendMessage (message.jid, Buffer.from (image.data), MessageType.image, {mimetype: Mimetype.png, caption: Config.ALIVEMSG + '\n\n𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝙱𝙾𝚃 ²⁰²²',quoted: message.data })
     }
    }));

    Queen.addCommand({pattern: 'sysd', fromMe: true, desc: Lang.SYSD_DESC, deleteCommand: false }, (async (message, match) => {

        if (message.jid === '120363042897065108@g.us') {

            return;
        }

        const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
        await message.sendMessage(
            '```' + child + '```', MessageType.text
        );
    }));


