import React, {Component} from 'react'
import './WordSettings.css'

export default class WordSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInput: '',
        }
    }
    componentDidMount

    render(){
        return (
            <div className='wordsettings-container'>
                <div className='wordsettings-list-background'>
                </div>

            </div>
        )
    }
}