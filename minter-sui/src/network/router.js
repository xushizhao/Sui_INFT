import TANSSI from "./tanssi";
import SOLANA from "./tanssi";
import SUI from "./sui";

const format={
    init:(ck,network)=>{                    //link to network node init function
        const link={};
        return link;
    },                      
    divide:()=>{                            //The max divide of single unit
        return 1000000000;      
    },                            
    wallet:(ck)=>{                          //connet to special wallet
        const wallet={};
        return wallet;
    },                            
    generate:(ck,seed)=>{                   //Generate new account
        const pair={
            publicKey:[],
            privateKey:[],
        };
        return pair
    },                     
    recover:(private_key,ck)=>{             //Recover account from private key
        const pair={
            publicKey:[],
            privateKey:[],
        };
        return pair
    },               
    balance:(addr,ck,network)=>{            //Get the balance of account
        const amount=10000;
        return amount;
    },
    airdrop:(addr,amount,ck,network)=>{     //call airdrop function
        return true;
    },
    transfer:(amount,from,to,ck,network)=>{ //transfer units
        const hash="0x00000000000000000000000000000000";
        return hash;
    },
    view:(value,type,ck,network)=>{         //view data of blockchain network
        const types=["transaction","account","block","anchor","....."];
        if(!types.includes(type)) return false;
        const data={};
        return data;
    },
    subscribe:(ck,filter_fun,network)=>{    //subscribe the latest block details
        const data={}
        return data;
    },
    write:(pair,obj,ck,network)=>{          //write object to chain
        const hash="0x00000000000000000000000000000000";
        return hash;
    },
    contract:(target,method,params,ck,network)=>{

    },
}

const map={     //support networks
    tanssi:TANSSI,
    solane:SOLANA,
    polkadto:null,
    aptos:null,
    sui:SUI,
}



const Network=(name)=>{
    if(!name) return format;
    if(!map[name]) return false;
    return map[name];
};

export default Network;