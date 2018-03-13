import React from 'react'
import './Button.css'

export default function ButtonCrud(props){
    let buttonStyle={
        backgroundColor: props.btnColor,
        color: 'white',
        fontWeight:900,
    }
    return(
        <div className={props.className}
                style={buttonStyle} 
                onClick={()=>props.btnFn()}>
            <span className="btnText">{props.btnTxt}</span>
        </div> 
    )
}