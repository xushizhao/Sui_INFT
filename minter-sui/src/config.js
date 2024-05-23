module.exports = {
    network:"sui",
    type:"testnet",
    contract:{
        address:"0x8236426eee92ab2857b73e9d4754fd12af77810371a1ade0c80884fb9fb8382d",
        method:"infts::mint_to_sender",
    },
    //network:"sui",
    node:[
        "wss://fraa-flashbox-2690-rpc.a.stagenet.tanssi.network",
        //"wss://wss.android.im",
        //"ws://127.0.0.1:9944",
        //"wss://dev2.metanchor.net",
    ],
    default:[
        "bafkreiddy2rqwebw5gm5hdqqqrbsqzkrubjk3ldzr2bia5jk4w5o2w5w4i",  //APE
        //"bafkreihze725zh5uqcffao5w27qdmaihjffjzj3wvtdfjocc33ajqtzc7a",  //Solana logo
        //"anchor://single/265468",
        //"anchor://aabb/217148",
    ],
    faucet:"https://faucet.w3os.net",
    agent:{
        inft:[
            "wss://wss.android.im",
        ],
        template:[
            "https://ipfs.w3os.net/"
        ],
    },
    unit:"$INFT",
    proxy:true,             //system default proxy setting
    version:20240103,
}