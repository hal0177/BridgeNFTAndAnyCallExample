const hre = require("hardhat")
const { destinationChainConfig } = require("../config.js")

const ethers = hre.ethers

const deployDestNft = async () => {
    if(hre.network.config.chainId !== destinationChainConfig.chainId) {
        throw new Error(`Incorrect network - please run using chain ID ${ destinationChainConfig.chainId }.`)
    }

    const NFT = await ethers.getContractFactory("NFT")

    const destinationChainNFT = await NFT.deploy("Destination Chain NFT", "DEST_NFT")
    await destinationChainNFT.deployed()

    console.log(`Destination Chain (${ destinationChainConfig.name }:${ destinationChainConfig.chainId }) NFT Address: ${ destinationChainNFT.address }`)
}

deployDestNft()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})