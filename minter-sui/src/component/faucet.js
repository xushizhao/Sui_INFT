import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";

import { FaDownload } from "react-icons/fa";

function Faucet(props) {
    const size = {
        row: [12],
        act:[8,4]
    };

    const self={
        clickFaucet:()=>{

        },
    }

    useEffect(() => {

    }, [props.update]);

    return (
        <Row>
            <Col sm={size.act[0]} xs={size.act[0]}>
                Faucet functions here.
            </Col>
            <Col className="text-end" sm={size.act[1]} xs={size.act[1]}>
                <button className="btn btn-md btn-secondary" onClick={(ev)=>{
                    self.clickFaucet(ev);
                }}><FaDownload /> Faucet</button>
            </Col>
        </Row>
    )
}

export default Faucet;