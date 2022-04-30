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
const {MessageType} = require('@adiwajshing/baileys');
const speedTest = require('@lh2020/speedtest-net'); // npm change speedtest
const TinyURL = require('tinyurl');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('web');
const SLang = Language.getString('webss');
// https://github.com/ddsol/speedtest.net/blob/master/bin/index.js#L86
function speedText(speed) {
    let bits = speed * 8;
    const units = ['', 'K', 'M', 'G', 'T'];
    const places = [0, 1, 2, 3, 3];
    let unit = 0;
    while (bits >= 2000 && unit < 4) {
      unit++;
      bits /= 1000;
    }

    return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}

Queen.addCommand({pattern: 'speedtest', fromMe: true, desc: Lang.SPEEDTEST_DESC, deleteCommand: false}, (async (message, match) => {
    var msg = await message.reply(Lang.SPEEDTESTING);
    var st = await speedTest({acceptLicense: true, acceptGdpr: true});
    
    await message.client.sendMessage(
      message.jid,Lang.SPEEDTEST_RESULT + '\n\n' + 
    '*ISP:* ```' + st.isp + '```\n' +
    '*Ping:* ```' + st.ping.latency + 'ms```\n' +
    '*' + Lang.UPLOAD + ':* ```' + speedText(st.upload.bandwidth) + '```\n' +
    '*' + Lang.DOWNLOAD + ':* ```' + speedText(st.download.bandwidth) + '```\n',MessageType.text
    );
    await msg.delete();
}));

Queen.addCommand({pattern: 'ping$', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC, deleteCommand: false}, (async (message, match) => {
  var start = new Date().getTime();
  await message.sendMessage('```Ping!```');
  var end = new Date().getTime();

  await message.client.sendMessage(
    message.jid,'*Pong!*\n```' + (end - start) + 'ms```', MessageType.text, { quoted: message.data });
}));

if (Config.WORKTYPE == 'private') {

    Queen.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

        TinyURL.shorten(`${match[1]}`, async(res, err) => {
          if (err)
            await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

            await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
        });
    }));
   Queen.addCommand({pattern: 'calc ?(.*)', fromMe: true, desc: Lang.CALC , deleteCommand: false}, (async (message, match) => {
        if (match[1].length < 4) { return await message.client.sendMessage(message.jid,Lang.VALİD, MessageType.text) }
        if (match[1].includes('+')) { var split = match[1].split('+'), sonsayi = split[1], ilksayi = split[0]
            var result = -(-ilksayi - sonsayi)
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('-')) { var split = match[1].split('-'), sonsayicik = split[1], ilksayicik = split[0] 
            var result = ilksayicik - sonsayicik
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('x')) { var split = match[1].split('x'), sonsayicarp = split[1], ilksayicarp = split[0] 
            var result = ilksayicarp * sonsayicarp
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('/')) { var split = match[1].split('/'), sonsayibol = split[1], ilksayibol = split[0] 
            var result = ilksayibol / sonsayibol
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text)
            }
        }
    }));
}
else if (Config.WORKTYPE == 'public') {

   Queen.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL, deleteCommand: false}, (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text);

        TinyURL.shorten(`${match[1]}`, async(res, err) => {
          if (err)
            await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

            await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text)
        });
    }));
    Queen.addCommand({pattern: 'calc ?(.*)', fromMe: false, desc: Lang.CALC , deleteCommand: false}, (async (message, match) => {
        if (match[1].length < 4) { return await message.client.sendMessage(message.jid,Lang.VALİD, MessageType.text) }
        if (match[1].includes('+')) { var split = match[1].split('+'), sonsayi = split[1], ilksayi = split[0]
            var result = -(-ilksayi - sonsayi)
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('-')) { var split = match[1].split('-'), sonsayicik = split[1], ilksayicik = split[0] 
            var result = ilksayicik - sonsayicik
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('x')) { var split = match[1].split('x'), sonsayicarp = split[1], ilksayicarp = split[0] 
            var result = ilksayicarp * sonsayicarp
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text);
            }
        }
        else if (match[1].includes('/')) { var split = match[1].split('/'), sonsayibol = split[1], ilksayibol = split[0] 
            var result = ilksayibol / sonsayibol
            try { await message.client.sendMessage(message.jid,Lang.SUC + result, MessageType.text) }
            catch (err) { return await message.client.sendMessage(message.jid,Lang.UNSUC + err,MessageType.text)
            }
        }
    }));
}
