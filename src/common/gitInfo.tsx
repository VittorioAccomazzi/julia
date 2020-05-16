import React, {FunctionComponent} from "react";
import gitVersion from '../Tools/gitInfo.json'

const labelStyle : React.CSSProperties = {
    position: 'absolute', 
    left: '8px', 
    bottom: '8px',
    fontSize : '10px'
}

const baseURL='https://github.com/VittorioAccomazzi/julia/tree/';

type gitInfoProps = { label : string }

const handleClick = () => {
    if( gitVersion.long != "" )  window.location.href = baseURL+gitVersion.long;
}
const  GitInfo : FunctionComponent<gitInfoProps> = ({label}) => {
        return ( 
            <div style={labelStyle} onClick={handleClick}>
                <p>{label + gitVersion.version}</p>
            </div>

        )
}

export default GitInfo;