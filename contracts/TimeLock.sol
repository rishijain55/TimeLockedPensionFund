pragma solidity ^0.5.0;

contract TimeLock {
    struct Employee {
        string name;
        uint256 age;
        uint256 retirementAge;
    }

    struct Deposit {
        uint256 amount;
        uint256 lockUntil;
    }

    mapping(address => Employee) public employees;
    mapping(address => Deposit[]) public deposits;

    event Deposited(address indexed account, uint256 index, uint256 amount, uint256 lockUntil);
    event Redeemed(address indexed account, uint256 amount, uint256 depositIndex);

    function registerEmployee(string memory _name, uint256 _age, uint256 _retirementAge) public {
        require(!isEmployeeRegistered(msg.sender), "Employee already registered");
        employees[msg.sender] = Employee(_name, _age, _retirementAge);
    }

    function isEmployeeRegistered(address account) public view returns (bool) {
        return employees[account].retirementAge != 0;
    }

    function deposit() external payable {
        require(isEmployeeRegistered(msg.sender), "Employee not registered");
        uint256 lockUntil = calculateRetirementTimestamp(msg.sender);
        deposits[msg.sender].push(Deposit(msg.value, lockUntil));
        emit Deposited(msg.sender, deposits[msg.sender].length - 1, msg.value, lockUntil);
    }

    function calculateRetirementTimestamp(address account) private view returns (uint256) {
        uint256 ageInSeconds = employees[account].age * 365 days;
        uint256 retirementAgeInSeconds = employees[account].retirementAge * 365 days;
        return now + retirementAgeInSeconds - ageInSeconds;
    }


    function lock(uint256 depositIndex, uint256 duration) external {
        Deposit[] storage userDeposits = deposits[msg.sender];
        require(depositIndex < userDeposits.length, "Invalid deposit index");
        require(userDeposits[depositIndex].lockUntil == 0, "Already locked");

        userDeposits[depositIndex].lockUntil = now + duration;
    }

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