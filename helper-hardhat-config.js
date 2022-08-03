const networkConfig = {
    4: {
        name: "rinkeby",
        tokenInitialSupply: "1000000",
        tokenName: "MyToken",
        tokenSymbol: "MTKN",
    },
    31337: {
        name: "hardhat",
        tokenInitialSupply: "1000000",
        tokenName: "MyToken",
        tokenSymbol: "MTKN",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
