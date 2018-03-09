import React, {Component} from 'react'
import './Card.css'
import Button from './Button'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            unMasteredWords: [],
            masteredWords: []
        }
        this.btnCorrect = this.btnCorrect.bind(this)
        this.btnIncorrect = this.btnIncorrect.bind(this)
    }

    btnCorrect(){
        alert('You are correct!')
    }

    btnIncorrect(){
        alert('You are incorrect!')
    }

    render(){
        let greenColor='#1cdb8b';
        let redColor='#e54b60';
        return(
            <div className='card-container'>
                <div className='card-content'>
                </div>
            <div className='button-container'>
                <Button 
                    btnColor={greenColor}
                    btnFn={this.btnCorrect} 
                    btnTxt='&#10004;'
                />
                <Button 
                    btnColor={redColor}
                    btnFn={this.btnIncorrect} 
                    btnTxt='&#10008;'
                />
            </div>
                

            </div>
        )
    }
}