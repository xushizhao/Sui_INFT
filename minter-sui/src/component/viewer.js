import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import { FaBackspace } from "react-icons/fa";

import Local from "../lib/local";
import Render from "../lib/render";
import Data from "../lib/data";
import tools from "../lib/tools";
import Chain from "../lib/chain";

import Network from "../network/router";

function Viewer(props) {
    const size = {
        row: [12],
        sell:[7,5],
        back:[10,2],
        info:[10,2],
    };

    let [market, setMarket]=useState("");

    let [width,setWidth]    =useState(100);
    let [height, setHeight] =useState(100);
    let [block,setBlock]= useState(0);
    
    let [block_hash,setBlockHash]=useState("");

    const dom_id="pre_viewer";

    const self={
        getTemplate:(alink,ck)=>{
            if (!Data.exsistHash("cache", alink)) {
                Chain.read(alink, (res) => {
                    const key = `${res.location[0]}_${res.location[1]}`;
                    const raw = JSON.parse(res.data[key].raw);
                    res.data[key].raw = raw;
                    Data.setHash("cache", alink, res.data[key]);
                    return ck && ck(res.data[key]);
                });
            } else {
                const dt=Data.getHash("cache", alink);
                return ck && ck(dt);
            }
        },
        show:()=>{
        },
    }

    useEffect(() => {
        self.show();

    }, [props.update]);

    return (
        <Row>
            <Col className="pt-2" sm={size.back[0]} xs={size.back[0]}>
                {props.anchor}
            </Col>
            <Col className="pb-2 text-end" hidden={!props.back} sm={size.back[1]} xs={size.back[1]}>
                <FaBackspace className="pointer" size={40} color={"#FFAABB"} onClick={(ev)=>{
                    self.clickHome(ev);
                }}/>
            </Col>
            <Col className="text-center pt-2" sm={size.row[0]} xs={size.row[0]} style={{minHeight:"300px"}}>
                <canvas width={width} height={height} id={dom_id}></canvas>
            </Col>
            <Col className="pt-2" sm={size.row[0]} xs={size.row[0]}>
                Block hash: {tools.shorten(block_hash,12)}
            </Col>
        </Row>
    )
}

export default Viewer;