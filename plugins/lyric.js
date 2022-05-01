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
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const config = require('../config');
const axios = require('axios');
const Language = require('../language');
const solenolyrics= require("solenolyrics"); 
const Slang = Language.getString('lyrics');
let wk = config.WORKTYPE == 'public' ? false : true


 Queen.addCommand({pattern: 'lyric ?(.*)', fromMe: wk, desc: Slang.LY_DESC, deleteCommand: false }, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, Slang.NEED, MessageType.text);

        var aut = await solenolyrics.requestLyricsFor(`${match[1]}`); 
        var son = await solenolyrics.requestAuthorFor(`${match[1]}`);
        var cov = await solenolyrics.requestIconFor(`${match[1]}`);
        var tit = await solenolyrics.requestTitleFor(`${match[1]}`);
          
        const pic = await axios.get(cov, {responseType: 'arraybuffer'});
        const msg = '┌───[▀▄▀▄▀▄ Qᴜᴇᴇɴ ʙᴏᴛ ▄▀▄▀▄▀]\n\n  *🎼LYRICS*\n\n│🔍sᴇᴀʀᴄʜᴇᴅ: ' + match[1] + '\n\n│✨ ғᴏᴜɴᴅᴇᴅ: ' + tit + '\n\n│👨‍🎤 ᴏᴡɴᴇʀ: ' + son +'\n\n│✒️ ʟʏʀɪᴄs : ' + aut + '\n\n└───────────◉'
        await message.client.sendMessage(message.jid, Buffer.from(pic.data),  MessageType.image, {caption: msg , quoted: message.data  });

    }))    
