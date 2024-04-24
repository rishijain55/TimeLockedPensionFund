// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.0;

// contract TimeLock {
//     struct Deposit {
//         uint256 amount;
//         uint256 lockUntil;
//     }

//     mapping(address => Deposit) public deposits;

//     event Deposited(address indexed account, uint256 amount, uint256 lockUntil);
//     event Redeemed(address indexed account, uint256 amount);

//     function deposit() external payable {
//         deposits[msg.sender] = Deposit(msg.value, 0);
//         emit Deposited(msg.sender, msg.value, 0);
//     }

//     function lock(uint256 duration) external {
//         Deposit storage deposit = deposits[msg.sender];
//         require(deposit.amount > 0, "No deposit found");
//         require(deposit.lockUntil == 0, "Already locked");

//         deposit.lockUntil = now + duration;
//     }

//     function redeem() external {
//         Deposit storage deposit = deposits[msg.sender];
//         require(deposit.amount > 0, "No deposit found");
//         require(now >= deposit.lockUntil, "Still locked");

//         uint256 amount = deposit.amount;
//         delete deposits[msg.sender];

//         msg.sender.transfer(amount);

//         emit Redeemed(msg.sender, amount);
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TimeLock {


    struct Deposit {
        uint256 amount;
        uint256 lockUntil;
    }

    mapping(address => Deposit[]) public deposits;

    event Deposited(address indexed account, uint index, uint256 amount, uint256 lockUntil);
    event Redeemed(address indexed account, uint256 amount, uint256 depositIndex);

    function deposit() external payable {
        deposits[msg.sender].push(Deposit(msg.value, 0));
        emit Deposited(msg.sender, deposits[msg.sender].length - 1, msg.value, 0);

    }

    function lock(uint256 depositIndex, uint256 duration) external {
        Deposit[] storage userDeposits = deposits[msg.sender];
        require(depositIndex < userDeposits.length, "Invalid deposit index");
        require(userDeposits[depositIndex].lockUntil == 0, "Already locked");

        userDeposits[depositIndex].lockUntil = now + duration;
    }

    // function redeem(uint256 depositIndex) external {
    //     Deposit[] storage userDeposits = deposits[msg.sender];
    //     require(depositIndex < userDeposits.length, "Invalid deposit index");
    //     Deposit storage deposit = userDeposits[depositIndex];
    //     require(deposit.amount > 0, "No deposit found");
    //     require(now >= deposit.lockUntil, "Still locked");

    //     uint256 amount = deposit.amount;
    //     delete userDeposits[depositIndex];

    //     msg.sender.transfer(amount);

    //     //delete the deposit
        

    //     emit Redeemed(msg.sender, amount, depositIndex);
    // }

    function redeem(uint256 depositIndex) external {
        Deposit[] storage userDeposits = deposits[msg.sender];
        require(depositIndex < userDeposits.length, "Invalid deposit index");
        Deposit storage deposit = userDeposits[depositIndex];
        require(deposit.amount > 0, "No deposit found");
        require(now >= deposit.lockUntil, "Still locked");

        uint256 amount = deposit.amount;

        // Remove the deposit (Shift Later Elements)
        for (uint i = depositIndex; i < userDeposits.length - 1; i++) {
            userDeposits[i] = userDeposits[i + 1];
        }

        // Delete the last element (now a duplicate)
        userDeposits.pop();  

        msg.sender.transfer(amount);

        emit Redeemed(msg.sender, amount, depositIndex);
    }

    function getDepositLength(address account) public view returns (uint256) {
        return deposits[account].length;
    }

    function getDepositAmount(address account, uint256 index) public view returns (uint256) {
        Deposit storage deposit = deposits[account][index];
        return deposit.amount;
    }

    function getDepositLockUntil(address account, uint256 index) public view returns (uint256) {
        Deposit storage deposit = deposits[account][index];
        return deposit.lockUntil;
    }
}