import React from "react";

const divStyle : React.CSSProperties = {
    userSelect:'none'
}

type ClickableProps = {
    link : string,
    children : React.ReactElement
}
const Clickable = ({link,children } : ClickableProps)=>{

    const onClick = ( event : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        window.location.href = link;
    }

    return (
        <div onClick={onClick} style={divStyle}>
            {children}
        </div>
    )

}

export default  Clickable;