# Time-Locked Pension Fund

A decentralized application (dApp) built on the Ethereum blockchain, implementing a time-locked pension fund system.

## Features

* **Employee Registration:** Employees register with name, birthdate, and desired retirement age.
* **Fund Deposit:** Employees deposit funds into their pension accounts.
* **Time-Locking:** Deposited funds are locked until the employee's retirement age.
* **Custom Personal Funds:** Employees can create funds with custom redeem dates and times.
* **Fund Redemption:** Employees can redeem pension or personal funds after the lock period.
* **User-Friendly Interface:**  Responsive design for ease of use.

## Getting Started

### Prerequisites

* Node.js (version >= 10.x)
* Truffle
* Ganache CLI
* MetaMask (browser extension)

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/rishijain55/TimeLockedPensionFund.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd TimeLockedPensionFund
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
# Running the dApp

1. Start Ganache CLI (separate terminal):
```bash
ganache-cli
```

2. Compile and migrate contracts:
```bash
truffle migrate --reset
```

3. Update app.js with your deployed contract address:
```javascript
const contractAddress = "0x.....";
```

4. Start dApp:
```bash
npm run dev
```

5. Connect your MetaMask wallet to the local Ethereum network (Ganache CLI).

6. Follow the on-screen instructions to register as an employee, deposit funds, and manage your pension account.


# Design Decisions

1. Data Structures: The contract uses mappings to store employee information and deposits. Mappings provide efficient key-value storage and retrieval, which is a good design choice for this use case.
2. Error Handling: The contract uses require statements to validate input and revert transactions in case of errors. This is a good practice to prevent invalid state transitions and save gas costs.
3. User Interface: A user interface has been created for interacting with the contract. The UI design choices include:

- Responsive design using Bootstrap and CSS.
- Separation of concerns between HTML, CSS, and JavaScript.
- Integration with Web3.js library for interacting with Ethereum.


4. Creation of Personal Funds: A section for personal funds has been included, where an employee can choose a custom pension redeem date and time. This feature allows for greater flexibility.
5. Multiple Users: The dApp supports multiple users, enabling multiple employees to manage their pension funds simultaneously.
