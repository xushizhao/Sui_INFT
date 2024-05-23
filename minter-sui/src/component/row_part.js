import { Col, Badge } from "react-bootstrap";

function RowPart(props) {
    const size = {
        row: [12],
    };

    const config={
        size:30,
        width:15.9,   //single character width;
        tag:8,
        padding:5.3,
        start:0,
    }

    const self={
        combine:(group)=>{
            const map={}
            let order=0;
            for(let i=0;i<group.length;i++){
                if(group[i]!==0){
                    const index=group[i];
                    if(!map[index]){
                        map[index]={offset:[],order:order};
                        order++;
                    } 
                    map[index].offset.push(i);
                }
            }
            map.queue=order;    //record the length of badge;
            return map;
        },
        getStruture:(n)=>{
            const arr=[];
            for(let i=0;i<n;i++){
                arr.push({index:0,position:0,data:null});
            }
            return arr;
        },
        struct:(group,section)=>{
            //1.get target data
            const map=self.combine(group);
            const arr=self.getStruture(map.queue);
            delete map.queue;

            //2.put all badges in a single queue
            for(var k in map){
                const row=map[k];
                const order=row.order;
                arr[order].index=parseInt(k);
                arr[order].data=map[k].offset;
            }

            //console.log(JSON.stringify(arr));

            //3.calc the position
            for(let i=0;i<arr.length;i++){
                const cur=arr[i];
                const c_len=cur.data.length;        //value width
                const center=config.width*c_len*0.5;
                if(i===0){
                    const val=arr[i].data[0];
                    arr[i].position=center-config.size*0.5+val*config.width;
                }else{
                    const pre=arr[i-1];
                    const p_len=pre.data.length;
                    const delta=cur.data[0]-pre.data[p_len-1];
                    const d_center=(delta+c_len*0.5)*config.width;
                    arr[i].position=d_center-config.size;
                }
            }
            return arr;
        }
    };
    const parts=self.struct(props.group,props.section);
    return (
        <Col className="part" sm={size.row[0]} xs={size.row[0]}>
            {parts.map((row, index) => (
                <Badge 
                    key={index}
                    className={props.active===(row.index-1)?"bg-danger":""} 
                    style={{marginLeft:`${row.position}px`,width:`${config.size}px`}}
                >#{row.index}</Badge>
            ))}
        </Col>
    )
}

export default RowPart;