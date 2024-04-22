// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TimeLock {
    struct Deposit {
        uint256 amount;
        uint256 lockUntil;
    }

    mapping(address => Deposit) public deposits;

    event Deposited(address indexed account, uint256 amount, uint256 lockUntil);
    event Redeemed(address indexed account, uint256 amount);

    function deposit() external payable {
        deposits[msg.sender] = Deposit(msg.value, 0);
        emit Deposited(msg.sender, msg.value, 0);
    }

    function lock(uint256 duration) external {
        Deposit storage deposit = deposits[msg.sender];
        require(deposit.amount > 0, "No deposit found");
        require(deposit.lockUntil == 0, "Already locked");

        deposit.lockUntil = now + duration;
    }

    function redeem() external {
        Deposit storage deposit = deposits[msg.sender];
        require(deposit.amount > 0, "No deposit found");
        require(now >= deposit.lockUntil, "Still locked");

        uint256 amount = deposit.amount;
        delete deposits[msg.sender];

        msg.sender.transfer(amount);

        emit Redeemed(msg.sender, amount);
    }
}