exports.menu = (id, BotName, corohelp, tampilTanggal, tampilWaktu, whatsapplu, kapanbotaktif, Twitter) => {
	return `🔰 -----[ *MENU ${BotName}* ]----- 🔰
  
Hi, *${id.split("@s.whatsapp.net")[0] || id.split("@g.us")[0] }* 👋️
Berikut adalah beberapa fitur yang ada pada bot ini!✨

⚠️ *${tampilTanggal}*
⚠️ *${tampilWaktu}*

♻ Command / Perintah :

=> *1.FITUR CEK HARGA CRYPTO*
Perintah: !price [coin]
Contoh: !price btc

=> *2.CALCULATOR COIN*
Perintah: !convert [amount] [from coin] [to coin]
Contoh: !convert 1 btc doge

=> *3. Garapan*
Perintah: !garapan
Contoh: !garapan

=> *4. CEK INFO GAS / FEE ETH*
Perintah: !gas
Contoh: !gas


=> *INFORMASI BOT*
_${BotName} akan mengirimkan informasi tentang bot!_
Perintah: !help
Contoh: !help

⚠️ INFORMASI COVID-19 TERBARU!

⚠️ POSITIF: *${corohelp.confirmed.value}*
⚠️ SEMBUH: *${corohelp.recovered.value}*
⚠️ MENINGGAL: *${corohelp.deaths.value}*
⚠️ UPDATE: *${corohelp.lastUpdate}*

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_

♻️ Mau pasang iklan di *${BotName} ?*
☎️ WA : *${whatsapplu}*
🕊️ Twitter: ${Twitter}

⚠️ Gunakan dengan bijak ‼️
⚠️ Bot ini berjalan ${kapanbotaktif} ‼️

  
🔰 -----[ *POWERED BY ${BotName}* ]----- 🔰`
}
