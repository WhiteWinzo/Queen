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


const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType, Mimetype} = require('@adiwajshing/baileys');
const {StringSession} = require('./Queen/');
const fs = require('fs');

async function botQueen () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [3, 3234, 9]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Queen')}${chalk.blue.bold('Bot')}
${chalk.white.italic('Queen Sting session')}
${chalk.blue.italic('ℹ️  Connecting to Whatsapp... Please Wait.')}`);
    });
    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('94') ? 'Session ekata danna one code eka: ' : 'String Code: '), st
        );

        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `QUEEN_SESSION="${st}"`);
        }
        console.log(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('94') ? 'meka katawath denna epa ' + conn.user.name : 'Dont Share This Code to Anyone ' + conn.user.name)
        process.exit(0);
    });
    await conn.connect();
}
Queen()
