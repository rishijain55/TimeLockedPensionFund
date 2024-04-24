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
    "name": "employees",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "age",
        "type": "uint256"
      },
      {
        "name": "retirementAge",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd0678947"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
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
    "signature": "0xd6d68177"
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
        "name": "index",
        "type": "uint256"
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
    "signature": "0x91ede45f04a37a7c170f5c1207df3b6bc748dc1e04ad5e917a241d0f52feada3"
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
        "name": "depositIndex",
        "type": "uint256"
      }
    ],
    "name": "Redeemed",
    "type": "event",
    "signature": "0xf3a670cd3af7d64b488926880889d08a8585a138ff455227af6737339a1ec262"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_age",
        "type": "uint256"
      },
      {
        "name": "_retirementAge",
        "type": "uint256"
      }
    ],
    "name": "registerEmployee",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x05b1dc28"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isEmployeeRegistered",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9d88ebb6"
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
        "name": "depositIndex",
        "type": "uint256"
      },
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
    "signature": "0x1338736f"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "depositIndex",
        "type": "uint256"
      }
    ],
    "name": "redeem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdb006a75"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getDepositLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x87ac828a"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getDepositAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd02bf22f"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getDepositLockUntil",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa60bae6e"
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

async function connectContract() {
    const contractAddress = "0x809F0fb88aE4F4009A01F72140A31728f6278a39";
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

connectContract();

// Get DOM elements
const connectWalletBtn = document.getElementById("connectWallet");
const walletInfoDiv = document.getElementById("walletInfo");
const depositAmountInput = document.getElementById("depositAmount");
const depositBtn = document.getElementById("deposit");
const depositInfoDiv = document.getElementById("depositInfo");
const depositsContainer = document.getElementById("depositsContainer");
const currentTimeDiv = document.getElementById("currentTime");
const registerEmployeeForm = document.getElementById("registerEmployeeForm");

// Event listeners
connectWalletBtn.addEventListener("click", connectWallet);
depositBtn.addEventListener("click", deposit);
registerEmployeeForm.addEventListener("submit", registerEmployee);

// Connect wallet function
async function connectWallet() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        walletInfoDiv.innerHTML = `Connected wallet: ${accounts[0]}`;
        displayDeposits();
        checkEmployeeRegistration();
    } catch (error) {
        console.error(error);
        walletInfoDiv.innerHTML = "Error connecting wallet";
    }
}

// Register employee function
async function registerEmployee(event) {
    event.preventDefault();
    const name = document.getElementById("employeeName").value;
    const age = parseInt(document.getElementById("employeeAge").value);
    const retirementAge = parseInt(document.getElementById("retirementAge").value);

    try {
        await contract.methods
            .registerEmployee(name, age, retirementAge)
            .send({ from: accounts[0] });
        alert("Employee registered successfully");
        checkEmployeeRegistration();
    } catch (error) {
        console.error(error);
        alert("Error registering employee");
    }
}

// Check if employee is registered
async function checkEmployeeRegistration() {
  if (!accounts || accounts.length === 0) {
      return;
  }

  const isRegistered = await contract.methods.isEmployeeRegistered(accounts[0]).call();
  if (isRegistered) {
      registerEmployeeForm.style.display = "none";
      const employee = await contract.methods.employees(accounts[0]).call();
      document.getElementById("employeeName").textContent = employee.name;
      document.getElementById("employeeAge").textContent = employee.age;
      document.getElementById("retirementAge").textContent = employee.retirementAge;
      document.getElementById("employeeInfo").style.display = "block";
  } else {
      registerEmployeeForm.style.display = "block";
      document.getElementById("employeeInfo").style.display = "none";
  }
}

// Deposit function
async function deposit() {
    if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet first!");
        return;
    }

    const depositAmount = web3.utils.toWei(depositAmountInput.value, "ether");

    try {
        const result = await contract.methods
            .deposit()
            .send({ from: accounts[0], value: depositAmount });

        displayDeposits();
    } catch (error) {
        console.error(error);
        depositInfoDiv.innerHTML = "Error depositing";
    }
}

// Display deposits function
async function displayDeposits() {
    console.log("Displaying deposits")
    if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet first!");
        return;
    }

    if (!contract) {
        alert("Please deploy the contract first!");
        return;
    }

    depositsContainer.innerHTML = ""; // Clear previous deposits

    try {
        const userDepositsLength = await contract.methods.getDepositLength(accounts[0]).call();
        if (userDepositsLength === 0) {
            depositsContainer.innerHTML = "No deposits found.";
            console.log("No deposits found")
            return;
        }
        console.log("userDepositsLength: ", userDepositsLength);


        const depositsList = document.createElement("ul");

        for (let i = 0; i < userDepositsLength; i++) {
            //get both amount and lockUntil
            
            const depositAmount = await contract.methods.getDepositAmount(accounts[0], i).call();
            const depositLockUntil = await contract.methods.getDepositLockUntil(accounts[0], i).call();


            console.log("lock is deposited: ", depositLockUntil, "amount: ", depositAmount)

            const depositItem = document.createElement("li");
            depositItem.textContent = `Deposit ${i}: Amount: ${web3.utils.fromWei(depositAmount, "ether")} ETH, Unlock Time: ${new Date(depositLockUntil * 1000).toLocaleString()}`;




            const redeemBtn = document.createElement("button");
            redeemBtn.textContent = "Redeem";
            redeemBtn.addEventListener("click", () => redeem(i));

            depositItem.appendChild(document.createTextNode(" "));
            depositItem.appendChild(redeemBtn);

            depositsList.appendChild(depositItem);
        }

        depositsContainer.appendChild(depositsList);
    } catch (error) {
        console.error(error);
        depositsContainer.innerHTML = "Error retrieving deposits";
    }
}

// Redeem function
async function redeem(depositIndex) {
    if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet first!");
        return;
    }

    if (!contract) {
        alert("Please deposit and lock funds first!");
        return;
    }

    //get the lockUntil time
    const lockUntil = await contract.methods.getDepositLockUntil(accounts[0], depositIndex).call();
    //check if the lock time has passed
    if (lockUntil > Math.floor(Date.now() / 1000)) {
        console.log("current time: ", Math.floor(Date.now() / 1000), "lockUntil: ", lockUntil, "depositIndex: ", depositIndex);
        alert("This deposit is still locked!");
        console.log("This deposit is still locked!")
        return;
    }


    try {
        const result = await contract.methods
            .redeem(depositIndex)
            .send({ from: accounts[0] });

        const amount = result.events.Redeemed.returnValues.amount;
        console.log(`Redeemed ${web3.utils.fromWei(amount, "ether")} ETH`);
        displayDeposits();
    } catch (error) {
        console.error(error);
        console.log("Error redeeming");
    }
}

async function displayCurrentTime() {
    const currentTimeString  = new Date().toLocaleString();
    // console.log("Current time: ", currentTimeString);
    currentTimeDiv.innerHTML = `Current time: ${currentTimeString}`;
    setTimeout(displayCurrentTime, 1000);

}

displayCurrentTime();