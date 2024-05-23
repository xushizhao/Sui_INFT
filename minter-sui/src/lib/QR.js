import Viewer from "../component/viewer";
import Detail from "../component/detail";
import Launch from "../component/launch";
import TPL from "../lib/tpl";

const self={    
    view:(UI,alink)=>{

    },
    template:(UI,cid)=>{
      if(!UI || !UI.dialog) return console.error("No UI to show launching information");
      return UI.dialog(<Launch alink={cid} dialog={UI.dialog} fresh={UI.fresh}/>,"Launching");
    },
    template_back:(UI,cid)=>{
      //1.save the template to local as the first one;
      TPL.view(cid,(def)=>{
        if(!def) return false;

        TPL.add(cid,()=>{
          
        },true);

         //2.show details of the template
        if(UI.dialog){
          UI.dialog(<Launch alink={cid} dialog={UI.dialog} fresh={UI.fresh}/>,"Launching");
          //UI.dialog(<Detail alink={cid} dialog={UI.dialog} fresh={UI.fresh}/>,"iNFT template previewer");
        }
      });
    },
  }

  export default self;