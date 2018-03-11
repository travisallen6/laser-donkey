import React from 'react'
import './CardContainer.css'


export default function Card(props){
    return(
        <div className='card-content'>
            <h1>{props.text}</h1>
        </div>
    )
}