// Replace with your contract ABI
const contractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "deposits",
    "outputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "lockUntil",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfc7e286d"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "lockUntil",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event",
    "signature": "0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Redeemed",
    "type": "event",
    "signature": "0x4896181ff8f4543cc00db9fe9b6fb7e6f032b7eb772c72ab1ec1b4d2e03b9369"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0xd0e30db0"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "lock",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdd467064"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "redeem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xbe040fb0"
  }
];

let contract;
let accounts;

let web3;

// Connect to Ethereum node
async function connectToEthereum() {
  if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum);
      try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
          console.error('User denied account access');
      }
  } else {
      alert('Please install MetaMask to use this dApp!');
  }
}

connectToEthereum();


// Get DOM elements
const connectWalletBtn = document.getElementById("connectWallet");
const walletInfoDiv = document.getElementById("walletInfo");
const depositAmountInput = document.getElementById("depositAmount");
const lockDurationInput = document.getElementById("lockDuration");
const depositBtn = document.getElementById("deposit");
const depositInfoDiv = document.getElementById("depositInfo");
const redeemBtn = document.getElementById("redeem");
const redeemInfoDiv = document.getElementById("redeemInfo");

// Event listeners
connectWalletBtn.addEventListener("click", connectWallet);
depositBtn.addEventListener("click", deposit);
redeemBtn.addEventListener("click", redeem);

// Connect wallet function
async function connectWallet() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        walletInfoDiv.innerHTML = `Connected wallet: ${accounts[0]}`;
    } catch (error) {
        console.error(error);
        walletInfoDiv.innerHTML = "Error connecting wallet";
    }
}

// Deposit function
async function deposit() {
  if (!accounts || accounts.length === 0) {
      alert("Please connect your wallet first!");
      return;
  }

  const contractAddress = prompt("Enter contract address:");
  contract = new web3.eth.Contract(contractABI, contractAddress);

  const depositAmount = web3.utils.toWei(depositAmountInput.value, "ether");
  const lockDuration = lockDurationInput.value;

  try {
      const result = await contract.methods
          .deposit()
          .send({ from: accounts[0], value: depositAmount });

      await contract.methods
          .lock(lockDuration)
          .send({ from: accounts[0] });

      depositInfoDiv.innerHTML = `Deposited ${web3.utils.fromWei(depositAmount, "ether")} ETH and locked for ${lockDuration} seconds`;
  } catch (error) {
      console.error(error);
      depositInfoDiv.innerHTML = "Error depositing or locking";
  }
}

// Redeem function
async function redeem() {
    if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet first!");
        return;
    }

    if (!contract) {
        alert("Please deposit and lock funds first!");
        return;
    }

    try {
        const result = await contract.methods
            .redeem()
            .send({ from: accounts[0] });

        const amount = result.events.Redeemed.returnValues.amount;
        redeemInfoDiv.innerHTML = `Redeemed ${web3.utils.fromWei(amount, "ether")} ETH`;
    } catch (error) {
        console.error(error);
        redeemInfoDiv.innerHTML = "Error redeeming";
    }
}