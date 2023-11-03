import { memo } from "react";


function Todos(props){
    console.log("child render");
    return(
      <div key={props.key}>
        <p>{props.brand}</p>
      </div>  
    )
}

export default memo(Todos);