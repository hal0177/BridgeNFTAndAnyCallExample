const hre = require("hardhat")
const { sourceChainConfig } = require("../config.js")
const dotenv = require("dotenv")
const fs = require("fs")

const ethers = hre.ethers

dotenv.config()

const deployed = JSON.parse(fs.readFileSync("./deployed.json"))

let sourceSigner, sourceAddress, sourceNFT

const getSigners = async () => {
    const sourceProvider = new ethers.providers.JsonRpcProvider(sourceChainConfig.rpcUrl)
    const sourceWallet = new ethers.Wallet(process.env.PK)
    sourceSigner = sourceWallet.connect(sourceProvider)
    sourceAddress = await sourceSigner.getAddress()
}

const mintSrcNft = async () => {
    await getSigners()
    sourceNFT = await ethers.getContractFactory("NFT", sourceSigner)
    const sourceChainNft = sourceNFT.attach(deployed.sourceChain.nft)
    const mintSourceNft = await sourceChainNft.mint(sourceAddress, "abc", { gasLimit: 1000000 })
    const receipt = await mintSourceNft.wait()
    console.log(receipt)
}

mintSrcNft()
.then(() => {
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})