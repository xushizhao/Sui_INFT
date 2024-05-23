module infts::infts {

    use sui::url::{Self, Url};
    use sui::sui::SUI;
    use std::string::String;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};
    use std::debug::print;
    use sui::coin::{Self,  Coin};
    use sui::balance;


    const NotNFTObject: u64 = 0;
    const NotCoinValue: u64 = 1;
    const PayERROR: u64 = 2;
    

    public struct INFT_NFT has key, store {
        id: UID,
        name: u64,
        from: address,
    } 

    // ===== Events ===== 事件
    public struct NFTMinted has copy, drop {
        // 新铸造的NFT的ID
        object_id: ID,
        // 新铸造的NFT的创造者
        creator: address,
        // 新铸造的NFT的名
        name: u64,
    }

     //待售inft列表
    public struct InftSellList has key,store{        
        id: UID,
        table: Table<ID, INFTInfo>,
        account: address,
     
    }
    //待售inft信息
    public struct INFTInfo has key, store {
        id: UID,
        price: u64, //费用       
        seller: address, //卖方用户
    }


    //初始化待售列表
    fun init( ctx: &mut TxContext) {

        let sender = tx_context::sender(ctx);   
        // let imagetable = table::new(ctx);

        let  inftSellList = InftSellList {
            id: object::new(ctx),
            table: table::new(ctx),
            account: sender,            
        };

        transfer::public_transfer(inftSellList, sender)       
    }

    // mint 图像
    public entry fun mint_to_sender(
        ipfs: String,  //ipfs地址
        clock: &Clock,  //用于生成nft随机名称
        offset: String, //用于计算图像偏移
        ctx: &mut TxContext
    ) {

        let randomname = clock::timestamp_ms(clock);     
        let sender = tx_context::sender(ctx);        

        let nft = INFT_NFT {
            id: object::new(ctx),
            name: randomname,
            from: sender,
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
        });

        //将生成的nft对象，转移给mint用户
        transfer::public_transfer(nft, sender);
    }


    //将inft添加至待售列表
    public entry fun add_product(
        inftSellList: &mut InftSellList,     
        nft: INFT_NFT, 
        price: u64, //计划出售费用
        sender: address, 
        ctx: &mut TxContext) {

        let sender1 = tx_context::sender(ctx);  

        //获取合约权限地址
        let recipient =  inftSellList.account;
        //将nft写入待售nft列表中，待用户购买
        let  inftinfo = INFTInfo {
            id: object::new(ctx),
            price: price, //费用       
            seller: sender1, //卖方用户
        };
        //获取inft的id
        let nft_id = object::id(&nft);
        //写入待售表格中
        table::add(&mut inftSellList.table, nft_id, inftinfo);

        //将nft权限移交给合约
        transfer::public_transfer(nft, recipient);    

    }




    // 购买市场中的INFT
    public entry fun buy(
        nft: INFT_NFT,  //inft地址
        inftSellList: &mut InftSellList,
        price: u64, //计划出售费用
        from: &mut Coin<SUI>,  
        ctx: &mut TxContext) {

        let sender = tx_context::sender(ctx);  
           
        //获取inft的id
        let nft_id = object::id(&nft);    
        assert!(table::contains(&inftSellList.table,nft_id), NotNFTObject);    

        //如果sui费用不足，不能进行执行
        // assert!(price > coin::value(*from)  , NotCoinValue);

        // 从inftSellList读取对应的nft地址
        let inftinfo = table::borrow(&inftSellList.table, nft_id);

        //如果sui费用不足，不能进行执行
        assert!(inftinfo.price > price , PayERROR);

        //从账号中获取price数量对应的sui
        let half_coins = coin::take(coin::balance_mut(from), price , ctx);        

        // 将half_coins支付给出售nft的用户
        transfer::public_transfer(half_coins, inftinfo.seller);      

        // 将nft转移对，购买用户
        transfer::public_transfer(nft, sender);  

    }

    public entry fun buytwo(        
        from: &mut Coin<SUI>,   //我的coin 
        sender: address, 
        price: u64, 
        ctx: &mut TxContext) {     

        //获取coin余额可变引用
        let coin_balance = coin::balance_mut(from);
        //拆分余额生成新的 balance
        let paid_coin = balance::split(coin_balance, price);
        transfer::public_transfer(coin::from_balance<SUI>(paid_coin, ctx), sender);      

        // let half_coins = coin::take(coin::balance_mut(from), price , ctx);   
        // // 将half_coins支付给出售nft的用户
        // transfer::public_transfer(half_coins,sender);   
        // // coin::put(coin::balance_mut(to), half_coins);     

    }

}