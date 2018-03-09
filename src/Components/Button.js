import React from 'react'
import './Button.css'

export default function Button(props){
    let buttonStyle={
        backgroundColor: props.btnColor,
        color: 'white',
        fontWeight:900,
    }
    return(
        <div className="Button"
                style={buttonStyle} 
                onClick={()=>props.btnFn()}>
            <span className="btnText">{props.btnTxt}</span>
        </div> 
    )
}