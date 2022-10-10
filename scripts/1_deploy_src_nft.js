const hre = require("hardhat")
const { sourceChainConfig } = require("../config.js")

const ethers = hre.ethers

const deploySrcNft = async () => {
    if(hre.network.config.chainId !== sourceChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ sourceChainConfig.chainId }.`)
    }

    const NFT = await ethers.getContractFactory("NFT")

    const sourceChainNFT = await NFT.deploy("Source Chain NFT", "SRC_NFT")
    await sourceChainNFT.deployed()

    console.log(`Source Chain (${ sourceChainConfig.name }:${ sourceChainConfig.chainId }) NFT Address: ${ sourceChainNFT.address }`)
}

deploySrcNft()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})