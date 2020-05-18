import React from "react";

// prevent any interaction
const divStyle : React.CSSProperties = {
    touchAction: 'none'
}

type NoInteractionProps = {
    children : React.ReactElement
}
const NoInteraction = ({children} : NoInteractionProps)=>{

    return (
        <div style={divStyle}>
            {children}
        </div>
    )

}

export default  NoInteraction;
