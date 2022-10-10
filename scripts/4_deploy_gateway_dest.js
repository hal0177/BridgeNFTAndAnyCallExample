const hre = require("hardhat")
const { destinationChainConfig } = require("../config.js")

const ethers = hre.ethers



const ANYCALL_PROXY = "0x1234567890123456789012345678901234567890"
const FLAG = 2
const TOKEN_DEST = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"



const deployGatewayDest = async () => {
    if(hre.network.config.chainId !== destinationChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ destinationChainConfig.chainId }.`)
    }

    const GatewayMintBurn = await ethers.getContractFactory("ERC721Gateway_MintBurn")

    const gatewayMintBurn = await GatewayMintBurn.deploy(ANYCALL_PROXY, FLAG, TOKEN_DEST)
    await gatewayMintBurn.deployed()

    console.log(`Destination Chain (${ destinationChainConfig.name }:${ destinationChainConfig.chainId }) Gateway Mint/Burn Address: ${ gatewayMintBurn.address }`)
}

deployGatewayDest()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})