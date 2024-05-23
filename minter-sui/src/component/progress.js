import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import { FaIdBadge } from "react-icons/fa";

import Result from "../component/result"
import Network from "../network/router";

import INFT from "../lib/inft";
import Local from "../lib/local";

//let interval_timer=null;
//const time=[];
function Progress(props) {
    const size = {
        row: [12],
        bar:[2,8,2],
        step:[1,2,2,1,2],
    };

    const config={
        round:40,           //full time to mint one
        delay:18,           //interval of transactions
    }

    const def_progress={
        START:1,
        READY:2,
        BROADCAST:3,
        INBLOCK:5,
        RETRACKED:4,
        FINALIZED:8,
    };

    //let [block, setBlock]=useState(0);
    let [list,setList]=useState([]);

    const self={
        getStatus:(order,now)=>{
            if(now===0) return "pt-3 waiting";
            if(order===now) return "pt-3 going";
            if(order<now) return "pt-3 done";
            return "pt-3 waiting";
        },
        getDone:(arr)=>{
            return 0;
        },
        getINFTbyName:(name)=>{
            console.log(name);
            const fa = Local.get("login");
            if (!fa) return false;
            const login = JSON.parse(fa);
            const addr = login.address;
            const ls = Local.get("list");
            const my = JSON.parse(ls);
            for(let i=0;i<my[addr].length;i++){
                if(name===my[addr][i].anchor) return my[addr][i];
            }
        },

        clickSingle:(name)=>{
            //const dt=INFT.single.target(name);
            const dt=self.getINFTbyName(name);
            console.log(dt);

            //console.log(name,hash);
            props.dialog(<Result 
                name={dt.anchor} 
                hash={dt.hash} 
                block={dt.block} 
                offset={dt.offset}
                template={dt.template.hash}
                price={!dt.price?0:dt.price}
                fav={dt.fav}
                skip={true}
                back={true} 
                dialog={props.dialog}
                from={"progress"}
            />, "iNFT Details");
        },
        showTask:()=>{
            const details=INFT.mint.detail();
            // if(time.length===0){
            //     self.initTimer(details.task.length,()=>{
            //         if(interval_timer!==null) clearInterval(interval_timer);
            //         interval_timer=setInterval(()=>{
            //             for(let i=0;i<time.length;i++){
            //                 if(time[i]>0){
            //                     time[i]--;
            //                 }
            //             }
                        
            //         },1000);
            //     });
            // }
            setList(details.task);            
        },

        // initTimer:(n,ck)=>{
        //     for(let i=0;i<n;i++){
        //         time.push(config.round+config.delay*i);
        //     }
        //     return ck && ck();
        // },
    }

    useEffect(() => {
        self.showTask();
        //setBlock(props.block);
       
        Network("sui").subscribe("progress",(bk, bhash)=>{
            //setBlock(bk);
            setTimeout(self.showTask,500);  //update task after finalized new block
        });
    }, [props.update]);

    const cmap={
        background:"#555555",
        borderRadius:"10px"
    }

    return (
        <Row>
            <Col className="pt-2 pb-4" style={cmap} sm={size.row[0]} xs={size.row[0]}>
                <Row>
                {list.map((row, index) => (  
                    <Col key={index} className="pt-2" sm={size.row[0]} xs={size.row[0]}>
                        <Row>
                            <Col className="pt-1" sm={size.bar[0]} xs={size.bar[0]}>
                                <h5>#{index+1}</h5>
                            </Col>
                            <Col className="pt-1" sm={size.bar[1]} xs={size.bar[1]}>
                                <Row className="pt-2">
                                    <Col className={"cornor-left "+self.getStatus(0,row.now)} sm={size.step[0]} xs={size.step[0]}></Col>
                                    <Col className={self.getStatus(1,row.now)} sm={size.step[1]} xs={size.step[1]}></Col>
                                    <Col className={self.getStatus(2,row.now)} sm={size.step[2]} xs={size.step[2]}></Col>
                                    <Col className={self.getStatus(3,row.now)} sm={size.step[3]} xs={size.step[3]}></Col>
                                    <Col className={self.getStatus(4,row.now)} sm={size.step[4]} xs={size.step[4]}></Col>
                                    <Col className={"cornor-right "+self.getStatus(5,row.now)}></Col>
                                </Row>
                            </Col>
                            <Col className="pt-1 text-end" hidden={row.now < def_progress.FINALIZED} sm={size.bar[2]} xs={size.bar[2]}>
                                <button  className="btn btn-sm btn-secondary" onClick={(ev)=>{
                                    self.clickSingle(row.name);
                                }}><FaIdBadge /></button>
                            </Col>
                            <Col className="pt-2 text-end" hidden={row.now >= def_progress.FINALIZED} sm={size.bar[2]} xs={size.bar[2]}>
                                {100*row.now/def_progress.FINALIZED}%
                            </Col>
                        </Row>
                    </Col>
                ))}
                </Row>
            </Col>
        </Row>
    )
}

export default Progress;