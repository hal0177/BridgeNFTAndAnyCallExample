const hre = require("hardhat")
const { sourceChainConfig, destinationChainConfig } = require("../config.js")

const ethers = hre.ethers



const GATEWAY_LILO_ADDRESS = "0x1234567890123456789012345678901234567890"
const GATEWAY_MINT_BURN_ADDRESS = "0x1234abcd1234abcd1234abcd1234abcd1234abcd"



const setPeersDest = async () => {
    if(hre.network.config.chainId !== destinationChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ destinationChainConfig.chainId }.`)
    }

    const GatewayMintBurn = await ethers.getContractFactory("ERC721Gateway_MintBurn")
    const gatewayMintBurn = GatewayMintBurn.attach(GATEWAY_MINT_BURN_ADDRESS)

    const setPeersTx = await gatewayMintBurn.setPeers([ sourceChainConfig.chainId ], [ GATEWAY_LILO_ADDRESS ])
    await setPeersTx.wait()

    console.log(`Destination Chain (${ destinationChainConfig.name }:${ destinationChainConfig.chainId }) peer set for chain ID ${ sourceChainConfig.chainId } to ${ GATEWAY_LILO_ADDRESS }`)
}

setPeersDest()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})