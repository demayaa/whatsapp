const { ethers } = require("ethers");
const bip39 = require('bip39')
const randomWords = require('random-words');
const fetch = require('node-fetch');
const fs = require("fs");
bip39.setDefaultWordlist('english')

var arr = [];
setInterval(function() {
    const bep = [...new Set(randomWords(12))]; //randomWords({ exactly: 12, join: ' '});
    const b = bep.join(' ')
    const a = bip39.validateMnemonic(b)
    const num = b.length
    console.log(num)
    
    if (num > 72 ) {
        console.log(b)
    }
    /*/console.log(bep)
    if (a == true) {
        const wallet = ethers.Wallet.fromMnemonic(b)
        arr.push({address: wallet.address, mnemonic: b})
        var key = 'mnemonic';
        const bc = [...new Map(arr.map(item => [item[key], item])).values()]
        fs.readFile('./address.js', 'utf-8', function(err, data) {
            if (err) throw err;
            var newValue = `${JSON.stringify({ data: bc})}`
            
            fs.writeFile('./address.js', newValue, 'utf-8', function(err, data) {
                if (err) throw err;
                console.log('success saved')
            })
        })
        console.log(bc)
    } 
    if (num > num){
        if (a == true) {
            const wallet = ethers.Wallet.fromMnemonic(bi)
            console.log(console.log({num: nu, mnemonic: bi, wallet: wallet}))
            async function data(address) {
               const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984&address=${address}&page=1&offset=100&sort=asc&apikey=DNCWUIR9GBCS7DIERYIIWPZ9Z2117IJ9ZZ`);
               const dat = await response.json();
               dat.result.forEach(element => console.log(element.tokenSymbol))
            }
            
            data(wallet.address)
        }   
    }*/
    

}, 100);

console.log(arr)