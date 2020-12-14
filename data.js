const { ethers } = require("ethers");
const bip39 = require('bip39')
const randomWords = require('random-words');
const fetch = require('node-fetch');
const fs = require("fs");
bip39.setDefaultWordlist('english')


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Used like so
var arr = ["royal","garden","owner","album","shove","cherry","combine","federal","vast","lava","hover","shop"];

var ar = [];
setInterval(function() {
    shuffle(arr);
    var arr1 = arr.join(' ');
    const a = bip39.validateMnemonic(arr1)
    if (a == true) {
        const wallet = ethers.Wallet.fromMnemonic(arr1)
        ar.push({address: wallet.address, mnemonic: arr1})
        var key = 'mnemonic';
        const bc = [...new Map(ar.map(item => [item[key], item])).values()]
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
},100)