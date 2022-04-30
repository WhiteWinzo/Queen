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
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('instagram');
const ig = require('../lib/insta')



Queen.addCommand({ pattern: 'ig ?(.*)', fromMe: wk, desc:Lang.INSTA_DESC, deleteCommand: false }, async (message, match) => {

  const iglink = match[1]
  

if (!iglink) return await message.client.sendMessage(message.jid,Lang.N_URL, MessageType.text, { quoted: message.data });

if (!match[1].includes('instagram.com')) return await message.client.sendMessage(message.jid,Lang.N_URL,MessageType.text, {quoted: message.data});
    var url =''
  if (iglink.includes('?igshid')) {
      var split = match[1].split('?igshid');
           url  = split[0]; } else {
           url = iglink ;
           }
    
 
await ig.insta(url).then(async (response) => {
    
if (response.type == 'image') {	

var load= await message.client.sendMessage(message.jid,Lang.D_POST, MessageType.text, { quoted: message.data });
var up = await message.client.sendMessage(message.jid,Lang.U_POST, MessageType.text, { quoted: message.data });
await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
var msg = ''
if (Config.DETAILS == 'true') msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥INSTAGRAM DOWNLODER*\n\n│❤️ʟɪᴋᴇs: ' + response.likes +  '\n\n│💬 ᴄᴏᴍᴍᴇɴᴛs: '+ response.comments + '\n\n│ 📤ᴜᴘʟᴏᴀᴅᴇʀ: ' + response.username +'\n\n│📂 ᴛʏᴘᴇ: '+ response.type + '\n\n└───────────◉'
if (Config.DETAILS == 'false') msg = Config.CAPTION    
const linkdata = await axios.get(response.url, { responseType: 'arraybuffer'})

await message.sendMessage(Buffer.from(linkdata.data), MessageType.image , { caption: msg , quoted: message.data }) 
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})}
    
    else if (response.type == 'video') {

var load= await message.client.sendMessage(message.jid,Lang.D_VID, MessageType.text, { quoted: message.data });   
var up = await message.client.sendMessage(message.jid,Lang.U_VID , MessageType.text, { quoted: message.data });
await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
var msg = ''
if (Config.DETAILS == 'true') msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥INSTAGRAM DOWNLODER*\n\n│❤️ʟɪᴋᴇs: ' + response.likes +  '\n\n│💬 ᴄᴏᴍᴍᴇɴᴛs: '+ response.comments + '\n\n│ 📤ᴜᴘʟᴏᴀᴅᴇʀ: ' + response.username +'\n\n│📂 ᴛʏᴘᴇ: '+ response.type + '\n\n└───────────◉'
if (Config.DETAILS == 'false') msg = Config.CAPTION      
const linkdata = await axios.get(response.url, { responseType: 'arraybuffer'})

await message.sendMessage(Buffer.from(linkdata.data), MessageType.video , { caption: msg , quoted: message.data})
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})}
  else if(!response.data.status){ return await message.client.sendMessage(message.jid,Lang.E_URL, MessageType.text, { quoted: message.data });

  }
 })});
Queen.addCommand({ pattern: 'insta ?(.*)', fromMe: wk, desc:Lang.I_DESC, deleteCommand: false }, async (message, match) => {
  const iglink = match[1]
  if (!iglink) return await message.client.sendMessage(message.jid,Lang.N_USER, MessageType.text, { quoted: message.data });
  const user = iglink.replace("https://www.instagram.com/","")
  var load= await message.client.sendMessage(message.jid,Lang.D_USER, MessageType.text, { quoted: message.data });
  await ig.igstalk(user).then(async (response) => {
    if(!response.status == 'error') {
    return await message.client.sendMessage(message.jid,Lang.E_USER, MessageType.text, { quoted: message.data });
       }
  else {
    const msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *✨ INSTAGRAM STALK*\n\n│👨‍💻ᴜsᴇʀɴᴀᴍᴇ: ' + response.username + '\n\n│👨‍🦰ғᴜʟʟɴᴀᴍᴇ: '+ response.full_name + '\n\n│ 👥ғᴏʟʟᴏᴡᴇʀs: '+ response.edge_followed_by.count + '\n\n│👤ғᴏʟʟᴏᴡɪɴɢ: '+ response.edge_follow.count + '\n\n│🗳️ᴘᴏsᴛs: ' + response.edge_owner_to_timeline_media.count +'\n\n│💬ʙɪᴏ: '+ response.biography + '\n\n└───────────◉'
     const photodata = await axios.get(response.profile_pic_url_hd, { responseType: 'arraybuffer'}); 
    await message.sendMessage(Buffer.from(photodata.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
    await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ;
  }
    })})
