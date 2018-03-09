import React from 'react'
import './Button.css'

export default function Button(props){
    let buttonStyle={
        backgroundColor: props.btnColor,
    }
    return(
        <div className="Button"
                style={buttonStyle} 
                onClick={()=>props.btnFn()}>
            <span class="btnText">{props.btnTxt}</span>
        </div> 
    )
}