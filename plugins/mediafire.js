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
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('mediafire');
Queen.addCommand({ pattern: 'mediafire ?(.*)', fromMe: wk, desc:Lang.M_DESC, deleteCommand: false }, async (message, match) => {
  const mlink = match[1]
  if (!mlink) return await message.client.sendMessage(message.jid,Lang.N_MLINK, MessageType.text, { quoted: message.data });
  if (!match[1].includes('mediafire')) return await message.client.sendMessage(message.jid,Lang.N_MLINK,MessageType.text, {quoted: message.data});
 var load= await message.client.sendMessage(message.jid,Lang.M_DOWN, MessageType.text, { quoted: message.data }); 
  const data = await axios.get(`https://sanuw-api.herokuapp.com/docs/download/mediafire?url=${mlink}&apikey=sanuwa`)
  if (!data.data.status){
  return await message.client.sendMessage(message.jid,Lang.E_MLINK, MessageType.text, { quoted: message.data })
  }else{
  const linkdata = await axios.get(data.data.result[0].link, { responseType: 'arraybuffer'});
  var up = await message.client.sendMessage(message.jid,Lang.M_UP , MessageType.text, { quoted: message.data });                                                  
await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ;  
await message.sendMessage(Buffer.from(linkdata.data), MessageType.document, { filename: data.data.result[0].nama, mimetype: data.data.result[0].mime,  quoted: message.data });
 return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})  
  
  }})
