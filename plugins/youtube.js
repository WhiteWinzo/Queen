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

const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const Language = require('../language');
const Lang = Language.getString('scrapers');
var gis = require('g-i-s');
const https = require('https');
const ytmp3 = require('../lib/ytmp3');
let wk = config.WORKTYPE == 'public' ? false : true

 Queen.addCommand({pattern: 'song ?(.*)', fromMe: wk, desc: Lang.SONG_DESC, deleteCommand: false}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text, {quoted: message.data});
  if (config.DETAILS == 'true') {
  if (match[1].includes(';audio')){
   
    
    
        var split = match[1].split(';');
        var song1 = split[0];
        var type = split[1];
     let arama = await yts(song1);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
         const msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥SONG DOWNLODER*\n\n│🎧sᴏɴɢ: ' + title2 + '\n\n│ 👀ᴠɪᴇᴡs: ' + views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + author + '\n\n│🖇️ᴜʀʟ: ' + url + '\n\n└───────────◉'
         var iavatar = await axios.get(thumbnail ,{responseType: 'arraybuffer'});
                 
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
                await message.sendMessage(Buffer.from(iavatar.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data});
                
   
  }else if (match[1].includes(';doc')){
   
    var split = match[1].split(';');
        var song1 = split[0];
        var type = split[1];
        let arama = await yts(song1);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
         const msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥SONG DOWNLODER*\n\n│🎧sᴏɴɢ: ' + title2 + '\n\n│ 👀ᴠɪᴇᴡs: ' + views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + author + '\n\n│🖇️ᴜʀʟ: ' + url + '\n\n└───────────◉'
         var iavatar = await axios.get(thumbnail ,{responseType: 'arraybuffer'});
                 
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
                await message.sendMessage(Buffer.from(iavatar.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.document, {filename: title2 + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data});
                
  }else{
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
         const msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥SONG DOWNLODER*\n\n│🎧sᴏɴɢ: ' + title2 + '\n\n│ 👀ᴠɪᴇᴡs: ' + views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + author + '\n\n│🖇️ᴜʀʟ: ' + url + '\n\n└───────────◉'
         var iavatar = await axios.get(thumbnail ,{responseType: 'arraybuffer'});
                 
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
                await message.sendMessage(Buffer.from(iavatar.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.document, {filename: title2 + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data});
                
  } } else if (config.DETAILS == 'false') {
   
   if (match[1].includes(';audio')){
   
    
    
        var split = match[1].split(';');
        var song1 = split[0];
        var type = split[1];
     let arama = await yts(song1);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
        
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data});
                
   
  }else if (match[1].includes(';doc')){
   
    var split = match[1].split(';');
        var song1 = split[0];
        var type = split[1];
        let arama = await yts(song1);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
         
                 
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.document, {filename: title2 + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data});
                
  }else{
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
       var load = await message.client.sendMessage(message.jid,config.SONG_DOWN,MessageType.text, {quoted: message.data});
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let url = arama[0].url
        let stream = await ytmp3(url);
      
          
         const song = await axios.get(stream.mp3 ,{responseType: 'arraybuffer'});
                 
       var up = await message.client.sendMessage(message.jid,config.SONG_UP,MessageType.text, {quoted: message.data});
                await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
                await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
                await message.client.sendMessage(message.jid,Buffer.from(song.data), MessageType.document, {filename: title2 + '.mp3', mimetype: 'audio/mpeg', ptt: false, quoted: message.data});
                
  }
  
  }
  
  }));


 Queen.addCommand({pattern: 'video ?(.*)', fromMe: wk, desc: Lang.VIDEO_DESC, deleteCommand: false }, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text, {quoted: message.data});    
    if (!match[1].includes('youtu')) return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text, {quoted: message.data});
  
  
    var svid = match[1].replace("shorts/","watch?v=")
    var s2vid = svid.replace("?feature=share","")
    var s3vid = await yts(s2vid);
    var s4vid = s3vid.videos[0].url;
    let title = s3vid.videos[0].title;
    let views = s3vid.videos[0].views;
    let author = s3vid.videos[0].author.name;
    let url = s3vid.videos[0].url;
    
        var VID = '';
        try {
            if (s2vid.includes('watch')) {
                var tsts = s2vid.replace('watch?v=', '')
                var alal = tsts.split('/')[3]
                VID = alal
            } else {     
                VID = match[1].split('/')[3]
            }
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data});
        }
        var load = await message.client.sendMessage(message.jid,config.VIDEO_DOWN,MessageType.text, {quoted: message.data});

        var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
        yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));

        yt.on('end', async () => {
   var up = await message.client.sendMessage(message.jid,config.VIDEO_UP,MessageType.text, {quoted: message.data});
            await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ;
       var msg = ''    
        if (config.DETAILS == 'true') msg = '┌───[𒆜զʊɛɛռ ɮօȶ 𒆜]\n\n  *📥VIDEO DOWNLODER*\n\n│📽️ᴠɪᴅᴇᴏ: ' + title + '\n\n│ 👀ᴠɪᴇᴡs: ' + views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + author + '\n\n│🖇️ᴜʀʟ: ' + url + '\n\n└───────────◉'
        if (config.DETAILS == 'false') msg = config.CAPTION  
            await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;
            await message.client.sendMessage(message.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4, caption: msg, quoted: message.data  });
        });
    }));

Queen.addCommand({pattern: 'yt ?(.*)', fromMe: wk, desc: Lang.YT_DESC, deleteCommand: false }, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {quoted: message.data}); 
var vsn = ''
if (config.LANG == 'EN')  vsn = '*🧜‍♀️ Use  .video / .song commands to download videos or songs. 🧜‍♂️*'
if (config.LANG == 'SI')  vsn = '*🧜‍♀️ වීඩියෝ හෝ ගීත ලබා ගැනීම සදහා .video .song යන විධාන භාවිත කරන්න. 🧜‍♂️*'
 
if (match[1].includes('https://youtu')) return await message.client.sendMessage(message.jid,vsn,MessageType.text, {quoted: message.data}); 
        var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text, {quoted: message.data});

        try {
            var arama = await yts(match[1]);
        } catch {
 return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text);
        }
    
         var mesaj = '';
        arama.all.map((video) => {
            mesaj += '📽️ *' + video.title + '*\n🔗 ' + video.url + '\n\n'
        });
        await message.client.sendMessage(message.jid,mesaj,MessageType.text, {quoted: message.data});
        await message.client.deleteMessage(message.jid, {id: reply.key.id, remoteJid: message.jid, fromMe: true}) ;  
    })); 
