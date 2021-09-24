const subsidy = artifacts.require("subsidy");

module.exports = function (deployer) {
  deployer.deploy(subsidy);
};
