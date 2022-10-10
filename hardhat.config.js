require("@nomicfoundation/hardhat-toolbox")
// const chainConfig = require("./config.js")
// const { dotenv } = require("dotenv")

// dotenv.config()
// const RPC_URL_SRC = process.env.RPC_URL_SRC
// const RPC_URL_DEST = process.env.RPC_URL_DEST
// const PK = process.env.PK

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    // networks: {
    //     fantomTestnet: {
    //         url: RPC_URL_SRC,
    //         chainId: 0xfa2,
    //         accounts: [ PK ]
    //     },
    //     bscTestnet: {
    //         url: RPC_URL_DEST,
    //         chainId: 0x61,
    //         accounts: [ PK ]
    //     }
    // }
}