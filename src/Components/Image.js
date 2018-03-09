import React from 'react'

export default function Image(props){
    return <div><img className='logo' src={props.imageSource} width={props.wide + 'px'} height={props.high + 'px'} alt=''/></div>

}