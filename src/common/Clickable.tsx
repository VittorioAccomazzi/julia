import React from "react";


type ClickableProps = {
    link : string,
    children : React.ReactElement
}
const Clickable = ({link,children } : ClickableProps)=>{

    const onClick = ( event : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        window.location.href = link;
    }

    return (
        <div onClick={onClick}>
            {children}
        </div>
    )

}

export default  Clickable;