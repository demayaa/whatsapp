exports.price = (usd, idr, coin, percent_change_1h, percent_change_24h, percent_change_7d, vol, cap, name) => {
    return `☢️ Coin: *${coin}* / *${name}* 
💰 Price: *${usd}* / *${idr}*
📉 1h: *${percent_change_1h}*%
💩 24h: *${percent_change_24h}*%
🌚 7d: *${percent_change_7d}*%
📊 Volume: *${vol}*
💎 MarketCap: *${cap}*

🤖 by: xnxx
bantu follow mas auto follback
https://twitter.com/HazaniIsman?s=08`
}

exports.convert = (from, to, amount, result ) => {
    return `Calculating ${from} ${amount} to ${to}
Result = ${result}`
}

exports.garapan = () => {
    return`
Https://pornhub.com`
}

exports.gas = (Safe, Propose, FastGas) => {
    return `🚥Ethereum Gas Prices
🛴 Safe Low: ${Safe} Gwei < 30mins 
🚗 Normal: ${Propose} GWei <5 min
🏍 Fast: ${FastGas} GWei <1 min
Wrap your BTC 🍬`
}