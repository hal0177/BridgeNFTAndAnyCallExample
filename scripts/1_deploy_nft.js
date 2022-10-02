const hre = require("hardhat")

const ethers = hre.ethers

const deploySrcNft = async () => {
    const NFT = await ethers.getContractFactory("NFT")
    
    const sourceChainNFT = await NFT.deploy("Source Chain NFT", "SRC_NFT")
    await sourceChainNFT.deployed()

    const destinationChainNFT = await NFT.deploy("Destination Chain NFT", "DEST_NFT")
    await destinationChainNFT.deployed()

    console.log(`Source Chain NFT Address: ${ sourceChainNFT.address }`)
    console.log(`Destination Chain NFT Address: ${ destinationChainNFT.address }`)
}

deploySrcNft().then(() => process.exitCode = 0)