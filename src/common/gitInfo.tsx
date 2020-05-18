import React, {FunctionComponent} from "react";
import gitVersion from '../Tools/gitInfo.json'

const versionStyle : React.CSSProperties = {
    position: 'absolute', 
    left: '8px', 
    bottom: '8px',
    fontSize : '10px'
}
const ribbonStyle : React.CSSProperties = {
    position: 'absolute', 
    right: '0px', 
    top: '0px'
}

type gitInfoProps = { label : string, baseURL? : string, forkme : Boolean }

const  GitInfo : FunctionComponent<gitInfoProps> = ({label, baseURL, forkme}) => {
        const handleClick = () => {
            if( baseURL && gitVersion.long !== "" )  window.location.href = baseURL+'/tree/'+gitVersion.long;
        }
        return ( 
            <>
            {forkme && baseURL && (
                <div style={ribbonStyle}> 
                    <a href={baseURL}>
                        <img width="100" height="100" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=100%2C100" alt="Fork me on GitHub"/>
                    </a>
                </div>
            ) }
            <div style={versionStyle} onClick={handleClick}>
                <p>{label + gitVersion.version}</p>
            </div>
            </>
        )
}

export default GitInfo;