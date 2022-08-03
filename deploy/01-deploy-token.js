const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

module.exports = async function () {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`deployer: ${deployer}`)
    const chainId = network.config.chainId

    const tokenName = networkConfig[chainId]["tokenName"]
    const tokenSymbol = networkConfig[chainId]["tokenSymbol"]
    const tokenInitialSupply = networkConfig[chainId]["tokenInitialSupply"]
    const args = [tokenName, tokenSymbol, tokenInitialSupply]

    const token = await deploy("MyToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}

module.exports.tags = ["all", "token"]
