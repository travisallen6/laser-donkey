import React, {Component} from 'react'
import './Card.css'
import Button from './Button'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            unMasteredWords: [],
            masteredWords: [],
            currentWord: '',
            lastWord: '',
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
    
    cycleWords(){
        let {unMasteredWords, masteredWords, currentWord,lastWord} = this.state;
        if(masteredWords.length < 5) {
            let randIndex = Math.floor(Math.random() * unMasteredWords.length)
            let removedWord = this.state.unMasteredWords.splice(randIndex,1)
            this.setState({currentWord: removedWord})
        }
        
    }
    
    componentDidMount(){
        this.setState({unMasteredWords: this.props.wordObject})
    }
    
    
    render(){
        let greenColor='#1cdb8b';
        let redColor='#e54b60';
        return(
            <div className='card-container'>
                <div className='card-content'>
                    {this.state.currentWord}
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