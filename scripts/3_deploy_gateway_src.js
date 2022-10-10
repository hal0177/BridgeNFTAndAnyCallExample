const hre = require("hardhat")
const { sourceChainConfig } = require("../config.js")

const ethers = hre.ethers



const ANYCALL_PROXY = "0x1234567890123456789012345678901234567890"
const FLAG = 2
const TOKEN_SRC = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"



const deployGatewaySrc = async () => {
    if(hre.network.config.chainId !== sourceChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ sourceChainConfig.chainId }.`)
    }

    const GatewayLILO = await ethers.getContractFactory("ERC721Gateway_LILO")

    const gatewayLilo = await GatewayLILO.deploy(ANYCALL_PROXY, FLAG, TOKEN_SRC)
    await gatewayLilo.deployed()

    console.log(`Source Chain (${ sourceChainConfig.name }:${ sourceChainConfig.chainId }) Gateway LILO Address: ${ gatewayLilo.address }`)
}

deployGatewaySrc()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})