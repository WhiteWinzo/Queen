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

const simpleGit = require('simple-git');
const git = simpleGit();
const Queen = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })

const Language = require('../language');
const Lang = Language.getString('updater');


Queen.addCommand({pattern: 'update$', fromMe: true, desc: Lang.UPDATER_DESC, deleteCommand: false}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        await message.client.sendMessage(
            message.jid,
            Lang.UPDATE, MessageType.text
        );    
    } else {
        var degisiklikler = Lang.NEW_UPDATE;
        commits['all'].map(
            (commit) => {
                degisiklikler += '🆕 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n_\n';
            }
        );
        
        await message.client.sendMessage(
            message.jid,
            degisiklikler + '```', MessageType.text
        ); 
    }
}));

Queen.addCommand({pattern: 'update now$', fromMe: true, desc: Lang.UPDATE_NOW_DESC, deleteCommand: false}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return await message.client.sendMessage(
            message.jid,
            Lang.UPDATE, MessageType.text
        );    
    } else {
        var guncelleme = await message.reply(Lang.UPDATING);
        if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(
                    message.jid,Lang.INVALID_HEROKU, MessageType.text);
                await new Promise(r => setTimeout(r, 1000));
                return await message.client.sendMessage(
                    message.jid,Lang.IN_AF, MessageType.text);
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            await message.client.sendMessage(
                message.jid,Lang.UPDATED, MessageType.text);

            await message.sendMessage(Lang.AFTER_UPDATE);
            
        } else {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    await message.client.sendMessage(
                        message.jid,Lang.UPDATED_LOCAL, MessageType.text);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    await message.client.sendMessage(
                        message.jid,'*❌ Güncelleme başarısız oldu!*\n*Hata:* ```' + err + '```', MessageType.text);
                }
            }));
            await guncelleme.delete();
        }
    }
}));
