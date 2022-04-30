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
const FilterDb = require('./sql/filters');
const Config = require('../config')
const Language = require('../language');
const Lang = Language.getString('filters');

var f_rep = ''
if (Config.LANG == 'SI') f_rep = '```ඔබ විසින් ඇතුලත් කරන ගන්නා ලද filter එක සාර්ථකව එකතු කරගන්නා ලදී ✅```'
if (Config.LANG == 'EN') f_rep = '```Filter Setted Successfully ✅```'

Queen.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, deleteCommand: false,}, (async (message, match) => {
    Mat = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (Mat === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else if (message.reply_message && match[1] !== '') {
        await FilterDb.setFilter(message.jid, match[1].replace(/['"“]+/g, ''), message.reply_message.text);
        return await message.client.sendMessage(message.jid,f_rep,MessageType.text);
    } else {
        if (Mat.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "test" "test two"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, Mat[0].replace(/['"“]+/g, ''), Mat[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), Mat[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(Mat[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));

Queen.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, deleteCommand: false,}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));


Queen.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    return filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (message.message == filter.dataValues.pattern) {
                await new Promise(r => setTimeout(r, 900));
                return await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Queen.addCommand({on: 'text', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    return filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            var fo = message.message.replace('$', '')
            if (fo == filter.dataValues.pattern && message.message.startsWith('$')) {
                await new Promise(r => setTimeout(r, 100));
                return await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
