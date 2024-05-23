
let checker = null;
let link = null;
const config = {
    interval: 800,
    defaultNode: "http://127.0.0.1:8899",
}

const funs = {
    
}

const self = {
    init: (network, ck) => {
        
    },

    //connect to Phantom wallet
    wallet: (ck) => {
        
    },
    balance: (ss58, ck,network) => {     //get balance from base58 account
        
    },
    generate: (ck, seed) => {
        
    },
    divide:()=>{
        
    },
    recover: (bs58Private, ck) => {
        
    },
    storage: (json, ck, network) => {
        
    },
    transfer: (amount, to, ck, network) => {
        
    },
    run: (program_bs58, param,signer ,ck, network) => {
        
    },
    airdrop: (ss58, amount, ck, network) => {
        
    },
    view: (value, type, ck, network) => {
        
    },
    subscribe: (ck,network) => {
        
    },
    test: (program_id, data_id, owner_id, ck, network) => {
    },
};

export default self;