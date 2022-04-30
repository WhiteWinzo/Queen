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
const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

const { errorMessage, infoMessage } = require('../helpers');
const Language = require('../language');
const PHONEDE_DESC = "It Send Github User Data."
const NEED_WORDC = "කරුණාකර නමක් ඇතුළත් කරන්න"
const USAGE = "..."
const LOADING = "Fetching User Data"
const PHN_PHN = "Name-:"
const PHN_NAME = "BIO-:"
const PHN_RDATE = "Company-:"
const PHN_SIZE = "Email-:"
const PHN_ANDRO = "Public Repo-:"
const PHN_STOR = "Public Gists-:"
const PHN_DISP = "Followers-:"
const PHN_INCH = "Following-:"
const PHN_PIX = "URL-:"
const PHN_VPIX = "Type-:"
const PHN_CREAT = "Created at-:"
const NOT_FOUND = "*Can't Find Anything!.*"



if (Config.WORKTYPE == 'private') {

    Queen.addCommand({ pattern: 'github ?(.*)', fromMe: true, usage: USAGE, desc: PHONEDE_DESC, deleteCommand: false  }, async (message, match) => {

    const pname = match[1]

    if (!pname) return await message.sendMessage(errorMessage(NEED_WORDC))

    await message.sendMessage(infoMessage(LOADING))

    await axios
      .get(`https://api.github.com/users/${pname}`)
      .then(async (response) => {
        const {
              login,
              id,
              avatar_url,
              html_url,
              bio,
              name,
              company,
              public_repos,
              public_gists,
              followers,
              following,
              created_at,
              type,
              email,
              
        } = response.data

        const profileBuffer = await axios.get(avatar_url, {responseType: 'arraybuffer'})

        const msg = `*${PHN_PHN}* ${login}` + `\n` +        
        `*${PHN_NAME}* ${bio}` + `\n` + 
        `*${PHN_RDATE}* ${company}`+ `\n` + 
        `*${PHN_SIZE}* ${email}` + `\n` + 
        `*${PHN_ANDRO}* ${public_repos}` + `\n` + 
        `*${PHN_STOR}* ${public_gists}` + `\n` + 
        `*${PHN_DISP}* ${followers}` + `\n` + 
        `*${PHN_INCH}* ${following}` + `\n` + 
        `*${PHN_PIX}* ${html_url}` + `\n` + 
        `*${PHN_VPIX}* ${type}` + `\n` + 
        `*${PHN_CREAT}* ${created_at}`
        
        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg +'\n\n'+ Config.CAPTION, quoted: message.data
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(NOT_FOUND + userName)),
      )
  },

 )
}

if (Config.WORKTYPE == 'public') {

   Queen.addCommand({ pattern: 'github ?(.*)', fromMe: false, usage: USAGE, desc: PHONEDE_DESC, deleteCommand: false  }, async (message, match) => {

    const pname = match[1]

    if (!pname) return await message.sendMessage(errorMessage(NEED_WORDC))

    await message.sendMessage(infoMessage(LOADING))

    await axios
      .get(`https://api.github.com/users/${pname}`)
      .then(async (response) => {
        const {
              login,
              id,
              avatar_url,
              html_url,
              bio,
              name,
              company,
              public_repos,
              public_gists,
              followers,
              following,
              created_at,
              type,
              email,
              
        } = response.data

        const profileBuffer = await axios.get(avatar_url, {responseType: 'arraybuffer'})

        const msg = `*${PHN_PHN}* ${login}` + `\n` +        
        `*${PHN_NAME}* ${bio}` + `\n` + 
        `*${PHN_RDATE}* ${company}`+ `\n` + 
        `*${PHN_SIZE}* ${email}` + `\n` + 
        `*${PHN_ANDRO}* ${public_repos}` + `\n` + 
        `*${PHN_STOR}* ${public_gists}` + `\n` + 
        `*${PHN_DISP}* ${followers}` + `\n` + 
        `*${PHN_INCH}* ${following}` + `\n` + 
        `*${PHN_VPIX}* ${type}` + `\n` + 
        `*${PHN_CREAT}* ${created_at}`
        
        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg +'\n\n'+ Config.CAPTION , quoted: message.data
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(NOT_FOUND + userName)),
      )
  },

 )
}
