import React from "react";

const divStyle : React.CSSProperties = {
    userSelect:'none'
}

type ClickableLinkProps = {
    link? : string,
    children : React.ReactElement
}
const ClickableLink = ({link,children } : ClickableLinkProps)=>{

    const onClick = ( event : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if( link ){
            window.location.href = link;
        } else {
            window.history.back();  
        }
    }

    return (
        <div onClick={onClick} style={divStyle}>
            {children}
        </div>
    )

}

export default  ClickableLink;