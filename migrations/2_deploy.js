const Token = artifacts.require("Token");
const louVault = artifacts.require("louVault");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(Token)

	//assign token into variable to get it's address
	const token = await Token.deployed()
	
	//pass token address for louVault contract(for future minting)
	await deployer.deploy(louVault, token.address)

	//assign dBank contract into variable to get it's address
	const louVaultAddress = await louVault.deployed()

	//change token's owner/minter from deployer to dBank
	await token.passMinterRole(louVault.address)
};