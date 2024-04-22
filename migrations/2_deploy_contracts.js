var TodoList = artifacts.require("./TimeLock.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
