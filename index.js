const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const menu = require("./lib/menu.js");
const price = require("./lib/price.js");
const donate = require("./lib/donate.js");
const info = require("./lib/info.js");
const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
const coinpaprikaAPI = new CoinpaprikaAPI();



const BotName = 'CryptoTeam BOT 🤖'; // Nama Bot Whatsapp
const Twitter = 'https://twitter.com/HazaniIsman?s=08'
const whatsapplu = '089509303316'; // Nomor whatsapplu cok
const kapanbotaktif = '24 JAM kalo ADA JARINGAN'; // Kapan bot lu aktif

//
const {
	WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	ReconnectMode,
	ProxyAgent,
	waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func) {
	for (var i in arr) {
		func(i, arr[i]);
	}
}
const conn = new WAConnection()
conn.on('qr', qr => {
	qrcode.generate(qr, {
		small: true
	});
	console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr mu cok!`);
});

conn.on('credentials-updated', () => {
	// save credentials whenever updated
	console.log(`credentials updated!`)
	const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
	fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @bintang_nur_pradana`))
conn.on('message-status-update', json => {
	const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
	console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by @bintang_nur_pradana`)
})

conn.on('message-new', async(m) => {
	const messageContent = m.message
	const text = m.message.conversation
	let id = m.key.remoteJid
	const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
	let imageMessage = m.message.imageMessage;
	console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


//	  Groups

	if (text == '!help') {
		const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
		var date = new Date();
		var tahun = date.getFullYear();
		var bulan = date.getMonth();
		var tanggal = date.getDate();
		var hari = date.getDay();
		var jam = date.getHours();
		var menit = date.getMinutes();
		var detik = date.getSeconds();
		switch (hari) {
			case 0:
				hari = "Minggu";
				break;
			case 1:
				hari = "Senin";
				break;
			case 2:
				hari = "Selasa";
				break;
			case 3:
				hari = "Rabu";
				break;
			case 4:
				hari = "Kamis";
				break;
			case 5:
				hari = "Jum'at";
				break;
			case 6:
				hari = "Sabtu";
				break;
		}
		switch (bulan) {
			case 0:
				bulan = "Januari";
				break;
			case 1:
				bulan = "Februari";
				break;
			case 2:
				bulan = "Maret";
				break;
			case 3:
				bulan = "April";
				break;
			case 4:
				bulan = "Mei";
				break;
			case 5:
				bulan = "Juni";
				break;
			case 6:
				bulan = "Juli";
				break;
			case 7:
				bulan = "Agustus";
				break;
			case 8:
				bulan = "September";
				break;
			case 9:
				bulan = "Oktober";
				break;
			case 10:
				bulan = "November";
				break;
			case 11:
				bulan = "Desember";
				break;
		}
		var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
		var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
		conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, whatsapplu, kapanbotaktif, Twitter), MessageType.text);
	}
	if (text.includes("!gas")) {
	    axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=DNCWUIR9GBCS7DIERYIIWPZ9Z2117IJ9ZZ').then((res) => {
	        var Safe = res.data.result.SafeGasPrice;
	        var Propose = res.data.result.ProposeGasPrice;
	        var FastGas = res.data.result.FastGasPrice;
	        
	        conn.sendMessage(id, price.gas(Safe, Propose, FastGas), MessageType.text)
	    })
	}
	
	if (text.includes("!convert")) {
	    const amount = text.split(" ")[1];
	    const from = text.split(" ")[2].toUpperCase();
	    const to = text.split(" ")[3].toUpperCase();
	    
	    axios.get(`https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&symbol=${from}&convert=${to}`, { headers: {'X-CMC_PRO_API_KEY': '5aa6575d-dc69-4245-86df-b43de888fa23','Accept': 'application/json'} }).then((res) => {
	        const result = new Intl.NumberFormat(['ban', 'id']).format(res.data.data.quote[to].price);
	        //console.log(result)
            conn.sendMessage(id, price.convert(amount, to, from, result), MessageType.text)
        })
	}
	
	if (text.includes("!garapan")) {
	    fs.readFile('./lib/garapan.js', 'utf-8', function(err, data) {
            if (err) throw err;
            conn.sendMessage(id, data, MessageType.text);
        })
	    
	}
	
	if (text.includes("!price")) {
	    const coin = text.replace(/!price /, "").toUpperCase();
	    axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin}`, { headers: {'X-CMC_PRO_API_KEY': '5aa6575d-dc69-4245-86df-b43de888fa23','Accept': 'application/json'} }).then((res) => {
	        
	        const p = res.data.data[coin].quote.USD.price;
	        const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p);
	        const idr = new Intl.NumberFormat('IDR', { style: 'currency', currency: 'IDR' }).format(p*14105);
	        const percent_change_1h = (res.data.data[coin].quote.USD.percent_change_1h).toFixed(2);
	        const percent_change_24h = (res.data.data[coin].quote.USD.percent_change_24h).toFixed(2);
	        const percent_change_7d = (res.data.data[coin].quote.USD.percent_change_7d).toFixed(2);
	        const vol = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(res.data.data[coin].quote.USD.volume_24h);
	        const cap = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(res.data.data[coin].quote.USD.market_cap);
	        const name = res.data.data[coin].name;
	        
	        
	        conn.sendMessage(id, price.price(usd, idr, coin, percent_change_1h, percent_change_24h, percent_change_7d, vol, cap, name), MessageType.text)
	    })
	   
	}
	
	if (text.includes("!addGarapan")) {
	    
        const content = text.replace(/!addGarapan /, "");
        const admin = "6289509303316@s.whatsapp.net";
        if (id === admin) {
            fs.readFile('./lib/garapan.js', 'utf-8', function(err, data) {
                if (err) throw err;
               var newValue = `${data}\n- - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -- - - - - - - -- - - - - -\n${content}`;
               
                fs.writeFile('./lib/garapan.js', newValue, 'utf-8', function(err, data) {
                    if (err) throw err;
                    conn.sendMessage(id, 'Successfuly !!!', MessageType.text)
                    const idGrub = '6281770575332-1586259198@g.us';
                    conn.sendMessage(idGrub, data, MessageType.text)
                    //conn.sendMessage(, data, MessageType.text)
                    //console.log(data)
                });
            });
        } else {
            conn.sendMessage(id, 'Maaf cuk lu bukan Admin kalo mau seponsor garapan  pm aja 089509303316 10 doge / garapan ', MessageType.text)
        }
        
	}
	
	if (text.includes("Hi")) {
	    conn.sendMessage(id, 'Iya kak ada yg bisa _Saya_ Bantu', MessageType.text)
	}
	if (text.includes("!push")) {
	    const idGrub = '6281770575332-1586259198@g.us';
	    fs.readFile('./lib/garapan.js', 'utf-8', function(err, data) {
            if (err) throw err;
            conn.sendMessage(idGrub, data, MessageType.text);
        })
	}

})