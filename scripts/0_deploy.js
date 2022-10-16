const hre = require("hardhat")
const { sourceChainConfig, destinationChainConfig } = require("../config.js")
const dotenv = require("dotenv")
const fs = require("fs")

const ethers = hre.ethers

dotenv.config()

let sourceSigner, destinationSigner
let sourceNFT, destinationNFT, GatewayLILO, GatewayMintBurn
let sourceChainNft, destinationChainNft, gatewayLilo, gatewayMintBurn

const deploySrcNft = async () => {
    sourceChainNft = await sourceNFT.deploy("Source Chain NFT", "SRC_NFT")
    await sourceChainNft.deployed()
    console.log(`Source NFT deployed on ${ sourceChainConfig.name } at: ${ sourceChainNft.address }`)
}

const deployDestNft = async () => {
    destinationChainNft = await destinationNFT.deploy("Destination Chain NFT", "DEST_NFT")
    await destinationChainNft.deployed()
    console.log(`Destination NFT deployed on ${ destinationChainConfig.name } at: ${ destinationChainNft.address }`)
}

const deploySrcGateway = async () => {
    gatewayLilo = await GatewayLILO.deploy(sourceChainConfig.anyCallProxy, 2, sourceChainNft.address)
    await gatewayLilo.deployed()
    console.log(`Source gateway deployed on ${ sourceChainConfig.name } at: ${ gatewayLilo.address }`)
}

const deployDestGateway = async () => {
    gatewayMintBurn = await GatewayMintBurn.deploy(destinationChainConfig.anyCallProxy, 2, destinationChainNft.address)
    await gatewayMintBurn.deployed()
    console.log(`Destination gateway deployed on ${ destinationChainConfig.name } at: ${ gatewayMintBurn.address }`)
}

const setSrcPeer = async () => {
    const setSrcPeersTx = await gatewayLilo.setPeers([ destinationChainConfig.chainId ], [ gatewayMintBurn.address ], { gasLimit: 1000000 })
    await setSrcPeersTx.wait()
    console.log(`Set source chain peer to ${ gatewayMintBurn.address }`)
}

const setDestPeer = async () => {
    const setDestPeersTx = await gatewayMintBurn.setPeers([ sourceChainConfig.chainId ], [ gatewayLilo.address ], { gasLimit: 1000000 })
    await setDestPeersTx.wait()
    console.log(`Set destination chain peer to ${ gatewayLilo.address }`)
}

const setMinter = async () => {
    const setMinterTx = await destinationChainNft.transferOwnership(gatewayMintBurn.address, { gasLimit: 1000000 })
    await setMinterTx.wait()
    console.log(`Set minter to ${ gatewayMintBurn.address } on destination chain ${ destinationChainConfig.name }`)
}

const getSigners = () => {
    const sourceProvider = new ethers.providers.JsonRpcProvider(sourceChainConfig.rpcUrl)
    const sourceWallet = new ethers.Wallet(process.env.PK)
    const destinationProvider = new ethers.providers.JsonRpcProvider(destinationChainConfig.rpcUrl)
    const destinationWallet = new ethers.Wallet(process.env.PK)
    sourceSigner = sourceWallet.connect(sourceProvider)
    destinationSigner = destinationWallet.connect(destinationProvider)
}

const main = async () => {
    try {
        getSigners()
    } catch(err) {
        console.log(`error in get signers`)
    }

    sourceNFT = await ethers.getContractFactory("NFT", sourceSigner)
    destinationNFT = await ethers.getContractFactory("NFT", destinationSigner)
    GatewayLILO = await ethers.getContractFactory("ERC721Gateway_LILO", sourceSigner)
    GatewayMintBurn = await ethers.getContractFactory("ERC721Gateway_MintBurn", destinationSigner)

    try {
        await deploySrcNft()
    } catch(err) {
        console.log(`error in deploy src nft: ${ err.message }`)
    }

    try {
        await deployDestNft()
    } catch(err) {
        console.log(`error in deploy dest nft: ${ err.message }`)
    }

    try {
        await deploySrcGateway()
    } catch(err) {
        console.log(`error in deploy src gateway: ${ err.message }`)
    }

    try {
        await deployDestGateway()
    } catch(err) {
        console.log(`error in deploy dest gateway: ${ err.message }`)
    }

    try {
        await setSrcPeer()
    } catch(err) {
        console.log(`error in set src peer: ${ err.message }`)
    }

    try {
        await setDestPeer()
    } catch(err) {
        console.log(`error in set dest peer: ${ err.message }`)
    }

    try {
        await setMinter()
    } catch(err) {
        console.log(`error in set minter: ${ err.message }`)
    }
}

main()
.then(() => {
    fs.writeFileSync("./deployed.json", JSON.stringify({ sourceChain: { chainId: sourceChainConfig.chainId, nft: sourceChainNft.address, gateway: gatewayLilo.address }, destinationChain: { chainId: destinationChainConfig.chainId, nft: destinationChainNft.address, gateway: gatewayMintBurn.address }}, null, 4))
    console.log(`Success.`)
    process.exitCode = 0
})
.catch((err) => {
    console.error(err.message)
    process.exitCode = 1
})