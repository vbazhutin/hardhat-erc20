const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { networkConfig } = require("../../helper-hardhat-config")

describe("Token unit tests", () => {
    let myToken, deployer
    const chainId = network.config.chainId

    beforeEach(async function () {
        console.log("Setting up tests")

        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        myToken = await ethers.getContract("MyToken", deployer)
    })

    describe("Constructor and mint", () => {
        it("Initializes the token with corrent name, symbol and initial supply", async () => {
            const tokenName = await myToken.name()
            const tokenSymbol = await myToken.symbol()
            const tokenCurrentSupply = await myToken.totalSupply()

            assert.equal(tokenName, networkConfig[chainId].tokenName)
            assert.equal(tokenSymbol, networkConfig[chainId].tokenSymbol)
            assert.equal(tokenCurrentSupply, networkConfig[chainId].tokenInitialSupply)
        })
    })

    describe("Transfer", () => {
        it("Should transfer from one address to another, reflecting the changes in the contract", async () => {
            const receiver = (await getNamedAccounts()).player
            const receiverInitialBalance = await myToken.balanceOf(receiver)
            const value = "1000"
            const tx = await myToken.transfer(receiver, value)
            await tx.wait(1)

            const receiverEndingBalance = await myToken.balanceOf(receiver)

            assert.equal(
                receiverEndingBalance.toString(),
                receiverInitialBalance.add(value).toString()
            )
        })
    })

    describe("Allowance", () => {
        it("Should reflect updated allowance value", async () => {
            const receiver = (await getNamedAccounts()).player
            const allowanceAmount = ethers.utils.parseEther("1")
            const tx = await myToken.approve(receiver, allowanceAmount)
            await tx.wait(1)

            const allowance = await myToken.allowance(deployer, receiver)

            assert.equal(allowance.toString(), allowanceAmount.toString())
        })
    })
})
