const hre = require("hardhat")
const { sourceChainConfig, destinationChainConfig } = require("../config.js")

const ethers = hre.ethers


const bridgeTx = async () => {}

bridgeTx()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})