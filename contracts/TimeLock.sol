pragma solidity ^0.5.0;

contract TimeLock {
    struct Employee {
        string name;
        uint256 birthdate; // Change to birthdate instead of age
        uint256 retirementAge;
    }

    struct Deposit {
        uint256 amount;
        uint256 lockUntil;
        bool pension;
    }

    mapping(address => Employee) public employees;
    mapping(address => Deposit[]) public deposits;

    event Deposited(address indexed account, uint256 index, uint256 amount, uint256 lockUntil);
    event Redeemed(address indexed account, uint256 amount, uint256 depositIndex);

    function registerEmployee(string memory _name, uint256 _birthdate, uint256 _retirementAge) public {
        require(!isEmployeeRegistered(msg.sender), "Employee already registered");
        employees[msg.sender] = Employee(_name, _birthdate, _retirementAge);
    }

    function isEmployeeRegistered(address account) public view returns (bool) {
        return employees[account].retirementAge != 0;
    }


    function incrementYear(uint256 timestamp) public pure returns (uint256) {
        uint256 secondsInYear;

        // Check if the current year (derived from timestamp) is a leap year
        if (isLeapYear(timestamp)) {
            secondsInYear = 31622400; // Seconds in a leap year
        } else {
            secondsInYear = 31536000; // Seconds in a regular year
        }

        return timestamp + secondsInYear;
    }

    // Helper function to determine leap year
    function isLeapYear(uint256 timestamp) private pure returns (bool) {
        uint256 year = getYear(timestamp);
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

    // Helper function to extract year from timestamp 
    function getYear(uint256 timestamp) private pure returns (uint256) {
        return 1970 + timestamp / 31536000;  // Approximation, assumes all years have the same length
    }

    function calculateRetirementTimestamp(address account) public view returns (uint256) {
        uint256 birthdateInSeconds = employees[account].birthdate;
        uint256 retirementAge = employees[account].retirementAge;

        // Start with the initial birthdate timestamp
        uint256 currentTimestamp = birthdateInSeconds; 

        // Increment the timestamp year by year until retirement age is reached
        for (uint256 i = 0; i < retirementAge; i++) {
            currentTimestamp = incrementYear(currentTimestamp); 
        }

        return currentTimestamp; 
    }

    function depositPension() external payable {
        require(isEmployeeRegistered(msg.sender), "Employee not registered");
        //calculateRetirementTimestamp
        uint256 retirementTimestamp = calculateRetirementTimestamp(msg.sender);
        deposits[msg.sender].push(Deposit(msg.value, retirementTimestamp, true));
        emit Deposited(msg.sender, deposits[msg.sender].length - 1, msg.value, retirementTimestamp);
    }

    function deposit(bool pension, uint256 lockUntil) external payable {
        require(isEmployeeRegistered(msg.sender), "Employee not registered");
        deposits[msg.sender].push(Deposit(msg.value,lockUntil, pension));
        emit Deposited(msg.sender, deposits[msg.sender].length - 1, msg.value,lockUntil);
    }

    function lock(uint256 depositIndex, uint256 period) external {
        Deposit[] storage userDeposits = deposits[msg.sender];
        require(depositIndex < userDeposits.length, "Invalid deposit index");
        require(userDeposits[depositIndex].lockUntil == 0, "Already locked");

        userDeposits[depositIndex].lockUntil = period;
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

    function isDepositPensionRelated(address account, uint256 index) public view returns (bool) {
        Deposit storage deposit = deposits[account][index];
        return deposit.pension;
    }
}