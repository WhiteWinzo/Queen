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
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const config = require('../config');
const axios = require('axios');
const uploadFile = require('../lib/uploadfile')
const {uploadByUrl} = require('cobrabot-patch')
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});

let baseURI = '/apps/' + config.HEROKU.APP_NAME;
var apikey_error = ''
var no_apikey = ''
var in_prog = ''
var succ_set = ''
var need_img = ''
var need_stic = ''
var need_logo = ''
if (config.LANG == 'SI') {
        apikey_error = '*‼️ඔබ IMGBB APIKEY සකසා නොමැත.*'
        no_apikey = '*‼️ඔබ ඇතුළත් කර ඇති IMGBB APIKEY වලංගු නොවේ.*'
        in_prog = '*♻️සකස් කරමින්...*\n*කරුණාකර මදක් රැදී සිටින්න.*'
        succ_set = '*✅සාර්ථකව සකසන ලදී.*'
       need_img = '*කරුණාකර පින්තූරයකට පිළිතුරු දෙන්න*'
        need_stic = '*කරුණාකර ස්ටිකරයකට පිළිතුරු දෙන්න*'
     need_logo = '*කරුණාකර වීඩියෝවකට හෝ පින්තූරයකට රිප්ලයි කරන්න.*'
    }
    if (config.LANG == 'EN') {
       
        apikey_error = '*‼️You have not set up an IMGBB APIKEY.*'
        no_apikey = '*‼️The IMGBB APIKEY you entered is invalid.*'
        in_prog  = '*♻️Prepairing...*\n*Please wait.*'
        succ_set = '*✅Succesfully setted* '
        need_img = '*Please Reply to an image*'
        need_stic = '*Please Reply to a sticker*'
       need_logo = '*Please reply to a video or image.*'
    }

Queen.addCommand({ pattern: 'setalive ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async (message, match) => {
  if (message.reply_message === false) return await message.sendMessage(need_img);
   var up =  await message.client.sendMessage(message.jid, in_prog , MessageType.text,  {  quoted: message.data })
    const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    if (!data.result.mimetype.includes('image')){
      return await message.client.sendMessage(message.jid,need_img,MessageType.text, {quoted: message.data});
    }else {
  const ibb =  await axios.get(`https://api.imgbb.com/1/upload?key=${config.IMGBB}&image=${result}`)
     if (!ibb.data.data)return await message.client.sendMessage(message.jid, no_apikey,MessageType.text, {quoted: message.data});
     if (ibb.statusText == 'OK'){                
        await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['ALIVE_LOGO']: ibb.data.data.url
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
      }
        
    }
  
       })})

Queen.addCommand({ pattern: 'setstic ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async (message, match) => {
  if (message.reply_message === false) return await message.sendMessage(need_stic);
   var up =  await message.client.sendMessage(message.jid, in_prog , MessageType.text,  {  quoted: message.data })
    const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    if (!result.includes('webp')){
      return await message.client.sendMessage(message.jid,need_stic,MessageType.text, {quoted: message.data});
    }else {
  const ibb =  await axios.get(`https://api.imgbb.com/1/upload?key=${config.IMGBB}&image=${result}`)
      if (!ibb.data.data.url)return await message.client.sendMessage(message.jid, no_apikey,MessageType.text, {quoted: message.data});
      if (ibb.statusText == 'OK'){                
        await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['ALIVE_STIC']: ibb.data.data.url
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
      }
        
    }
  
       })})

Queen.addCommand({ pattern: 'setwelcome ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async (message, match) => {
  if (message.reply_message === false) return await message.sendMessage(message.jid,need_logo, MessageType.text,  {  quoted: message.data });
   var up =  await message.client.sendMessage(message.jid, in_prog , MessageType.text,  {  quoted: message.data })
    const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    if (data.result.mimetype.includes('image')){
       const ibb =  await axios.get(`https://api.imgbb.com/1/upload?key=${config.IMGBB}&image=${result}`)
     if (!ibb.data.data)return await message.client.sendMessage(message.jid, no_apikey,MessageType.text, {quoted: message.data});
     if (ibb.statusText == 'OK'){                
        await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['LOGO_WELCOME']: ibb.data.data.url
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
      }
        
    }else if(data.result.mimetype.includes('video')){
        
       const tele =  await uploadByUrl(result)
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['LOGO_WELCOME']: tele.link
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
 
    }else {
        return await message.sendMessage(message.jid,need_logo, MessageType.text,  {  quoted: message.data });
    }
  
       })})

Queen.addCommand({ pattern: 'setbye ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async (message, match) => {
  if (message.reply_message === false) return await message.sendMessage(message.jid,need_logo, MessageType.text,  {  quoted: message.data });
   var up =  await message.client.sendMessage(message.jid, in_prog , MessageType.text,  {  quoted: message.data })
    const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    if (data.result.mimetype.includes('image')){
       const ibb =  await axios.get(`https://api.imgbb.com/1/upload?key=${config.IMGBB}&image=${result}`)
     if (!ibb.data.data)return await message.client.sendMessage(message.jid, no_apikey,MessageType.text, {quoted: message.data});
     if (ibb.statusText == 'OK'){                
        await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['LOGO_BYE']: ibb.data.data.url
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
      }
        
    }else if(data.result.mimetype.includes('video')){
        
       const tele = await uploadByUrl(result)
       await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['LOGO_BYE']: tele.link
                    } 
                });
                await message.client.sendMessage(message.jid,succ_set , MessageType.text, {quoted: message.data})
 
    }else {
        return await message.sendMessage(message.jid,need_logo, MessageType.text,  {  quoted: message.data });
    }
  
       })})

