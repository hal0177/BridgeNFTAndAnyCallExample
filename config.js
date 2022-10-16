module.exports = {
    sourceChainConfig: {
        name: "Fantom Testnet",
        chainId: 4002,
        rpcUrl: "https://rpc.testnet.fantom.network/",
        // anyCallProxy: "0xd7c295e399ca928a3a14b01d760e794f1adf8990"
        anyCallProxy: "0xc629d02732EE932db1fa83E1fcF93aE34aBFc96B"
    },
    destinationChainConfig: {
        name: "BSC Testnet",
        chainId: 97,
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        // anyCallProxy: "0x5fac4f1ac9f8a4233e4ca6a332e6a5d0266edc0b"
        anyCallProxy: "0xD2b88BA56891d43fB7c108F23FE6f92FEbD32045"
    }
}