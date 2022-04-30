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
const got = require('got');
const Config = require('../config');


const Language = require('../language');
const Lang = Language.getString('weather');

if (Config.WORKTYPE == 'private') {

    Queen.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: true, deleteCommand: false}, async (message, match) => {

	    if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text);
	    } catch {
		    return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	    }
    });
}
if (Config.WORKTYPE == 'public') {

    Queen.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: false, deleteCommand: false}, async (message, match) => {

	    if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text);
	    } catch {
		    return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	    }
    });
    Queen.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: true, dontAddCommandList: true, deleteCommand: false}, async (message, match) => {

	    if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text);
	    } catch {
		    return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	    }
    });
}
