/*
╭━━━╮            ╭━━╮   ╭╮
┃╭━╮┃            ┃╭╮┃  ╭╯╰╮
┃┃╱┃┣╮╭┳━━┳━━┳━╮ ┃╰╯╰┳━┻╮╭╯
┃┃╱┃┃┃┃┃┃━┫┃━┫╭╮╮┃╭━╮┃╭╮┃┃
┃╰━╯┃╰╯┃┃━┫┃━┫┃┃┃┃╰━╯┃╰╯┃╰╮
╰━━╮┣━━┻━━┻━━┻╯╰╯╰━━━┻━━┻━╯
   ╰╯
▌│█║▌║▌║QᵤₑₑN BₒT║▌║▌║█│▌
♥‿♥ ᖇEᑕOᗪEᗪ ᗷY ᗪᗩᖇKᗯIᑎᘔO
✉𝚃𝚎𝚕𝚎𝚐𝚛𝚊𝚖:https://t.me/DarkWinzo
✉𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙:https://Wa.me/+94705193038
🛡𝙻𝚒𝚌𝚎𝚗𝚜𝚎𝚍 𝚞𝚗𝚍𝚎𝚛 𝚝𝚑𝚎  𝙶𝙿𝙻-𝟹.𝟶 𝙻𝚒𝚌𝚎𝚗𝚜𝚎;
⚠ 𝚢𝚘𝚞 𝚖𝚊𝚢 𝚗𝚘𝚝 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚏𝚒𝚕𝚎 𝚎𝚡𝚌𝚎𝚙𝚝 𝚒𝚗 𝚌𝚘𝚖𝚙𝚕𝚒𝚊𝚗𝚌𝚎 𝚠𝚒𝚝𝚑 𝚝𝚑𝚎 𝙻𝚒𝚌𝚎𝚗𝚜𝚎❗
██▓▒­░⡷⠂ᵂʰᵃᵗˢᵃᵖᵖ ᵇᵒᵗ ⁻ ᴵˢᵘʳᵘ ᴸᵃᵏˢʰᵃⁿ⠐⢾░▒▓██
*/

const Queen = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const dil = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');

const Language = require('../language'); 
const Lang = Language.getString('log'); 

Queen.addCommand({ pattern: 'log', fromMe: true, desc: Lang.LOG, warn: Lang.ANIM, onlyGroup: true , deleteCommand: false}, (async (message, match) => { 

    const meta = await message.client.groupMetadata(message.jid)
    const usmeta = message.client.isOnWhatsApp(message.jid)

    if (message.jid.includes('-')) {
        if (!message.reply_message) {
            return await message.client.sendMessage(
                message.jid,
                Lang.REPLY,
                MessageType.text
            );
        }
        else if (message.reply_message.text) {
            await message.client.sendMessage(
                message.client.user.jid,
                Lang.HEAD + meta.id + Lang.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + Lang.USER + Lang.MSG + message.reply_message.text,
                MessageType.text
            );
            await message.client.sendMessage(
                message.jid,
                Lang.SUC,
                MessageType.text,
            );
        }  
        else if (message.reply_message.image) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('im.jpg')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('im.jpg'),
                    MessageType.image,
                    { caption: Lang.HEAD + meta.id + Lang.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + Lang.USER }
                );
                await message.client.sendMessage(
                    message.jid,
                    Lang.SUC,
                    MessageType.text,
                );
            });
        }
        else if (message.reply_message.video) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('vid.mp4')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('vid.mp4'),
                    MessageType.video,
                    { mimetype: Mimetype.mpeg, caption: Lang.HEAD + meta.id + Lang.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + Lang.USER }
                );
                await message.client.sendMessage(
                    message.jid,
                    Lang.SUC,
                    MessageType.text,
                );
            });
        }
        else if (!message.reply_message.text && !message.reply_message.video && !message.reply_message.sticker && !message.reply_message.image) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('ad.mp3')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('ad.mp3'),
                    MessageType.audio,
                    { mimetype: Mimetype.mp4Audio} 
                );
                await message.client.sendMessage(
                    message.client.user.jid,
                    Lang.HEAD + meta.id + Lang.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + Lang.USER,
                    MessageType.text
                );
                await message.client.sendMessage(
                    message.jid,
                    Lang.SUC,
                    MessageType.text,
                );
            });
        }
        else {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('log.webp')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('log.webp'),
                    MessageType.sticker
                );
                await message.client.sendMessage(
                    message.client.user.jid,
                    Lang.HEAD + meta.id + Lang.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + Lang.USER,
                    MessageType.text
                );
                await message.client.sendMessage(
                    message.jid,
                    Lang.SUC,
                    MessageType.text,
                );
            });
        }
    }
    else if (!message.jid.includes('-')) {
        return;
    }
}));
