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
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('sticker');

Queen.addCommand({pattern: 'sticker$', fromMe: wk, desc: Lang.STICKER_DESC,  deleteCommand: false}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
        var downloading = await message.client.sendMessage(message.jid,Lang.DOWNLOADING,MessageType.text, { quoted: message.data});
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        if (message.reply_message.video === false && message.reply_message.image) {
            ffmpeg(location)
                .outputOptions(["-y", "-vcodec libwebp"])
                .videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1')
                .save('st.webp')
                .on('end', async () => {
                    await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker, { quoted: message.data});
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

        }

        ffmpeg(location)
            .outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"])
            .videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1')
            .save('sticker.webp')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, { quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
