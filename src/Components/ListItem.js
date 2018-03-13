import React, {Component} from 'react'
import './ListItem.css'

export default function ListItem (props){
        return(
                <div className='crud-title' >{props.element.word}</div>
        )
}