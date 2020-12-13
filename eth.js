const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/0d916c818fce4519bf6f3925edf612e7');

const address = "0x0133ce179bfd0e6837Cd04C8222F1BB75B8942d7";
const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
const ERC20TransferABI = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    }
];


const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)


 function data() {
   var balance = daiToken.methods.balanceOf(address).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      // console.log("The balance is: ", res)
      return res;
    }).then(res => console.log(res));
  var symbol =  daiToken.methods.symbol().call(function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
       // console.log("The symbol is: ", res)
       return res;
    });
    return console.log([{balance:  balance, symbol: symbol }])
}

data()