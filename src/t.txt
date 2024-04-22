pragma solidity ^0.5.0;

contract TimeLockedPensionFund {

    struct Deposit {
        uint256 amount;
        uint256 unlockTime; 
    }

    mapping (address => Deposit[]) public deposits; 

    // Constructor: Set a default lock period (e.g., 1 year)
    uint256 public defaultLockPeriod = 31536000; // 1 year in seconds

    function deposit(uint256 _lockPeriod) public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        uint256 unlockTime = now + (_lockPeriod > 0 ? _lockPeriod : defaultLockPeriod);
        deposits[msg.sender].push(Deposit(msg.value, unlockTime));
    }

    function topUp(uint256 _depositIndex) public payable {
        require(msg.value > 0, "Top up amount must be greater than zero");
        Deposit storage deposit = deposits[msg.sender][_depositIndex];
        require(deposit.unlockTime > now, "Deposit is already unlocked");

        deposit.amount += msg.value;
    }

    function withdraw(uint256 _depositIndex) public {
        Deposit storage deposit = deposits[msg.sender][_depositIndex];
        require(deposit.unlockTime <= now, "Deposit is still locked");

        uint256 amount = deposit.amount;
        deposit.amount = 0; 
        msg.sender.transfer(amount);
    } 
}