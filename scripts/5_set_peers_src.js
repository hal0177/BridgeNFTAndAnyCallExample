const hre = require("hardhat")
const { sourceChainConfig, destinationChainConfig } = require("../config.js")

const ethers = hre.ethers



const GATEWAY_LILO_ADDRESS = "0x1234567890123456789012345678901234567890"
const GATEWAY_MINT_BURN_ADDRESS = "0x1234abcd1234abcd1234abcd1234abcd1234abcd"



const setPeersSrc = async () => {
    if(hre.network.config.chainId !== sourceChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ sourceChainConfig.chainId }.`)
    }

    const GatewayLILO = await ethers.getContractFactory("ERC721Gateway_LILO")
    const gatewayLilo = GatewayLILO.attach(GATEWAY_LILO_ADDRESS)

    const setPeersTx = await gatewayLilo.setPeers([ destinationChainConfig.chainId ], [ GATEWAY_MINT_BURN_ADDRESS ])
    await setPeersTx.wait()

    console.log(`Source Chain (${ sourceChainConfig.name }:${ sourceChainConfig.chainId }) peer set for chain ID ${ destinationChainConfig.chainId } to ${ GATEWAY_MINT_BURN_ADDRESS }`)
}

setPeersSrc()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})