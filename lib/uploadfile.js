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


const axios = require("axios");
const fs = require("fs");
const FormData = require('form-data')
const { default: Axios } = require('axios');

function uploadFile(path) {
	return new Promise((resolve,reject) => {
		const bodyForm = new FormData();
		bodyForm.append('file', fs.createReadStream(path))
		axios(`https://chika-uploader.herokuapp.com/upload`,{
			method: 'POST',
			data: bodyForm,
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
			}
		})
        .then(({ data }) => {
			resolve(data)
		})
	})
}

module.exports = uploadFile 
