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
        "name": "birthdate",
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
      },
      {
        "name": "pension",
        "type": "bool"
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
        "name": "_birthdate",
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
    "inputs": [
      {
        "name": "pension",
        "type": "bool"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0xc57273c2"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "calculateRetirementTimestamp",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9bbc5133"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "depositIndex",
        "type": "uint256"
      },
      {
        "name": "period",
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
    "name": "isDepositPensionRelated",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x1473ff6d"
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
    const contractAddress = "0x042b8a9e40d17980c70ac1ecee383f575c855c0a";
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
        displayPersonalDeposits();
        checkEmployeeRegistration();
    } catch (error) {
        console.error(error);
        walletInfoDiv.innerHTML = "Error connecting wallet";
    }
}

// Register employee function
async function registerEmployee(event) {
  event.preventDefault();
  const name = document.getElementById("employeeNameInput").value;
  let birthdate = new Date(document.getElementById("birthdateInput").value);
  birthdate.setHours(0, 0, 0, 0); // Ensure time is 00:00 IST
  const birthdateTimestamp = birthdate.getTime() / 1000;
  const retirementAge = parseInt(document.getElementById("retirementAgeInput").value);
  console.log("Registering employee", name, birthdate, retirementAge);
  try {
      await contract.methods
          .registerEmployee(name, birthdateTimestamp, retirementAge)
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
      const birthdateStr = new Date(employee.birthdate * 1000).toLocaleDateString();
      document.getElementById("employeeBirthDate").textContent = birthdateStr;
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
        console.log("Depositing", depositAmount);
        const result = await contract.methods
            .deposit(true)
            .send({ from: accounts[0], value: depositAmount });

        //lock the deposit 
        //depositIndex must be length - 1
        const depositLength = await contract.methods.getDepositLength(accounts[0]).call();
        const depositIndex = depositLength - 1;
        const employee = await contract.methods.employees(accounts[0]).call();
        const birthDate = employee.birthdate;
        console.log("birthDate: ", birthDate);
        const retirementAge = Number(employee.retirementAge);
        // calculate the lock time by adding years to the birthdate without using sol function
        const birthDateObj = new Date(birthDate * 1000);
        console.log("birthDateObj: ", birthDateObj.toLocaleString());
        const retirementDate = new Date(birthDate*1000);
        let byear = retirementDate.getFullYear();
        let retYear = byear + retirementAge;
        retirementDate.setFullYear(retYear);
        console.log( typeof retirementAge, typeof byear, typeof retYear)

        console.log("retirementDate: ", retirementDate.toLocaleString(), "Birthdate: ", birthDateObj.toLocaleString());
        const locktill = Math.floor(retirementDate.getTime() / 1000);

        console.log("locktill: ", locktill);
        //lock the deposit
        await contract.methods
        .lock( depositIndex, locktill)
        .send({ from: accounts[0] });
        console.log("Locked deposit");

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

      const depositsList = document.createElement("div");
      depositsList.classList.add("card-columns");

      for (let i = 0; i < userDepositsLength; i++) {
          const depositAmount = await contract.methods.getDepositAmount(accounts[0], i).call();
          const depositLockUntil = await contract.methods.getDepositLockUntil(accounts[0], i).call();
          let pension = await contract.methods.isDepositPensionRelated(accounts[0], i).call();
          console.log("pension: ", pension);

          // Continue if the deposit is not pension-related
          if (!pension) {
              continue;
          }

          const depositCard = document.createElement("div");
          depositCard.classList.add("card");

          const depositCardBody = document.createElement("div");
          depositCardBody.classList.add("card-body");

          const depositTitle = document.createElement("h5");
          depositTitle.classList.add("card-title");
          depositTitle.textContent = `Deposit ${i}`;

          const depositAmountText = document.createElement("p");
          depositAmountText.classList.add("card-text");
          depositAmountText.textContent = `Amount: ${web3.utils.fromWei(depositAmount, "ether")} ETH`;

          const depositUnlockText = document.createElement("p");
          depositUnlockText.classList.add("card-text");
          depositUnlockText.textContent = `Unlock Time: ${new Date(depositLockUntil * 1000).toLocaleString()}`;

          const redeemBtn = document.createElement("button");
          redeemBtn.classList.add("btn", "btn-primary");
          redeemBtn.textContent = "Redeem";
          redeemBtn.addEventListener("click", () => redeem(i));

          depositCardBody.appendChild(depositTitle);
          depositCardBody.appendChild(depositAmountText);
          depositCardBody.appendChild(depositUnlockText);
          depositCardBody.appendChild(redeemBtn);

          depositCard.appendChild(depositCardBody);
          depositsList.appendChild(depositCard);
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
        displayPersonalDeposits();
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

// Get DOM elements for personal funds
const personalDepositAmountInput = document.getElementById("personalDepositAmount");
const personalRedeemDate = document.getElementById("personalRedeemDate");
const personalRedeemTime = document.getElementById("personalRedeemTime");
const personalDepositBtn = document.getElementById("personalDeposit");
const personalDepositInfoDiv = document.getElementById("personalDepositInfo");
const personalDepositsContainer = document.getElementById("personalDepositsContainer");

// Event listener for personal deposit
personalDepositBtn.addEventListener("click", personalDeposit);

// Personal deposit function
async function personalDeposit() {
    if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet first!");
        return;
    }

    const depositAmount = web3.utils.toWei(personalDepositAmountInput.value, "ether");
    const redeemDateValue = personalRedeemDate.value;
    const redeemTimeValue = personalRedeemTime.value;
    console.log("Redeem date: ", redeemDateValue, "Redeem time: ", redeemTimeValue)

    if (!redeemDateValue || !redeemTimeValue) {
        alert("Please select a redeem date and time.");
        return;
    }

    const redeemDateTime = new Date(`${redeemDateValue}T${redeemTimeValue}`);
    console.log("Redeem date time: ", redeemDateTime);
    const lockUntil = Math.floor(redeemDateTime.getTime() / 1000);

    try {

        const result = await contract.methods.deposit(false).send({ from: accounts[0], value: depositAmount });
        let depositIndex = await contract.methods.getDepositLength(accounts[0]).call();
        depositIndex = depositIndex - 1;
        console.log("Depositing", depositAmount, "lockUntil", lockUntil, "depositIndex", depositIndex);
        await contract.methods.lock(depositIndex, lockUntil).send({ from: accounts[0] });
        // personalDepositInfoDiv.innerHTML = `Deposited ${web3.utils.fromWei(depositAmount, "ether")} ETH. Locked until ${redeemDateTime.toLocaleString()}`;
        displayPersonalDeposits();
    } catch (error) {
        console.error(error);
        // personalDepositInfoDiv.innerHTML = "Error depositing personal funds";
    }
}

// // Display personal deposits function
// async function displayPersonalDeposits() {
//     if (!accounts || accounts.length === 0) {
//         alert("Please connect your wallet first!");
//         return;
//     }

//     if (!contract) {
//         alert("Please deploy the contract first!");
//         return;
//     }

//     personalDepositsContainer.innerHTML = ""; // Clear previous deposits

//     try {
//         const userDepositsLength = await contract.methods.getDepositLength(accounts[0]).call();
//         if (userDepositsLength === 0) {
//             personalDepositsContainer.innerHTML = "No personal deposits found.";
//             return;
//         }

//         const depositsList = document.createElement("ul");

//         for (let i = 0; i < userDepositsLength; i++) {
//             const depositAmount = await contract.methods.getDepositAmount(accounts[0], i).call();
//             const depositLockUntil = await contract.methods.getDepositLockUntil(accounts[0], i).call();
//             let pension = await contract.methods.isDepositPensionRelated(accounts[0], i).call();

//             //continue if the deposit is pension related
//             if (pension) {
//                 continue;
//             }

//             const depositItem = document.createElement("li");
//             depositItem.textContent = `Personal Deposit ${i}: Amount: ${web3.utils.fromWei(depositAmount, "ether")} ETH, Unlock Time: ${new Date(depositLockUntil * 1000).toLocaleString()}`;

//             const redeemBtn = document.createElement("button");
//             redeemBtn.textContent = "Redeem";
//             redeemBtn.addEventListener("click", () => redeem(i));

//             depositItem.appendChild(document.createTextNode(" "));
//             depositItem.appendChild(redeemBtn);

//             depositsList.appendChild(depositItem);
//         }

//         personalDepositsContainer.appendChild(depositsList);
//     } catch (error) {
//         console.error(error);
//         personalDepositsContainer.innerHTML = "Error retrieving personal deposits";
//     }
// }

async function displayPersonalDeposits() {
  console.log("Displaying deposits")
  if (!accounts || accounts.length === 0) {
      alert("Please connect your wallet first!");
      return;
  }

  if (!contract) {
      alert("Please deploy the contract first!");
      return;
  }

  personalDepositsContainer.innerHTML = ""; // Clear previous deposits


  try {
      const userDepositsLength = await contract.methods.getDepositLength(accounts[0]).call();
      if (userDepositsLength === 0) {
          depositsContainer.innerHTML = "No deposits found.";
          console.log("No deposits found")
          return;
      }
      console.log("userDepositsLength: ", userDepositsLength);

      const depositsList = document.createElement("div");
      depositsList.classList.add("card-columns");

      for (let i = 0; i < userDepositsLength; i++) {
          const depositAmount = await contract.methods.getDepositAmount(accounts[0], i).call();
          const depositLockUntil = await contract.methods.getDepositLockUntil(accounts[0], i).call();
          let pension = await contract.methods.isDepositPensionRelated(accounts[0], i).call();
          console.log("pension: ", pension);

          // Continue if the deposit is not pension-related
          if (pension) {
              continue;
          }

          const depositCard = document.createElement("div");
          depositCard.classList.add("card");

          const depositCardBody = document.createElement("div");
          depositCardBody.classList.add("card-body");

          const depositTitle = document.createElement("h5");
          depositTitle.classList.add("card-title");
          depositTitle.textContent = `Deposit ${i}`;

          const depositAmountText = document.createElement("p");
          depositAmountText.classList.add("card-text");
          depositAmountText.textContent = `Amount: ${web3.utils.fromWei(depositAmount, "ether")} ETH`;

          const depositUnlockText = document.createElement("p");
          depositUnlockText.classList.add("card-text");
          depositUnlockText.textContent = `Unlock Time: ${new Date(depositLockUntil * 1000).toLocaleString()}`;

          const redeemBtn = document.createElement("button");
          redeemBtn.classList.add("btn", "btn-primary");
          redeemBtn.textContent = "Redeem";
          redeemBtn.addEventListener("click", () => redeem(i));

          depositCardBody.appendChild(depositTitle);
          depositCardBody.appendChild(depositAmountText);
          depositCardBody.appendChild(depositUnlockText);
          depositCardBody.appendChild(redeemBtn);

          depositCard.appendChild(depositCardBody);
          depositsList.appendChild(depositCard);
      }

      personalDepositsContainer.appendChild(depositsList);
    } catch (error) {
        console.error(error);
        personalDepositsContainer.innerHTML = "Error retrieving personal deposits";
    }
}