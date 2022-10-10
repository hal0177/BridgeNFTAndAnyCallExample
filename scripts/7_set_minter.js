const hre = require("hardhat")
const { destinationChainConfig } = require("../config.js")

const ethers = hre.ethers



const TOKEN = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
const GATEWAY_MINT_BURN_ADDRESS = "0x1234abcd1234abcd1234abcd1234abcd1234abcd"



const setMinter = async () => {
    if(hre.network.config.chainId !== destinationChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ destinationChainConfig.chainId }.`)
    }

    const NFT = await ethers.getContractFactory("NFT")
    const nft = NFT.attach(TOKEN)

    const setMintersTx = await nft.transferOwnership(GATEWAY_MINT_BURN_ADDRESS)
    await setMintersTx.wait()

    console.log(`Destination Chain (${ destinationChainConfig.name }:${ destinationChainConfig.chainId }) NFT minter set to ${ GATEWAY_MINT_BURN_ADDRESS }.`)
}

setMinter()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})