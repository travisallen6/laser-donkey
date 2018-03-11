import React, {Component} from 'react'
import './CardContainer.css'
import Button from './Button'
import Card from './Card'
import axios from 'axios'

export default class CardContainer extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            masteryThreshold: 1, 
            unMasteredWords: [],
            masteredWords: [],
            currentWord: '',
            lastWord: '',
            finalWord: false,
            finalWordList: [],
            complete:false,
        }
        this.btnCorrect = this.btnCorrect.bind(this)
        this.btnIncorrect = this.btnIncorrect.bind(this)
    }
    componentDidMount(){

        let promise = axios.get('/api/words')
        promise.then( res => {
            let objectArray = []
            res.data.map( val => objectArray.push({word: val,hit: 0, miss:0}))
            let startIndex = Math.floor(Math.random() * objectArray.length)
            let startWord = objectArray.splice(startIndex,1)
            
            this.setState({
                unMasteredWords: objectArray,
                currentWord: startWord[0],
                finalWord: false
            })
        } )
    }
    
    
    
    cycleWords(){
        let { unMasteredWords, masteredWords, currentWord, lastWord, masteryThreshold } = this.state

        //Put the old word back where it belongs depending on if mastery was achieved or not
        let addToMastered = currentWord.hit >= masteryThreshold ? [...masteredWords, currentWord] : [...masteredWords];
        let addToUnMastered = currentWord.hit < masteryThreshold ? [...unMasteredWords, currentWord] : [...unMasteredWords];

        // Pick the array of the next object and splice
        let dice = Math.floor(Math.random() * 5)
        let selectedArray =  dice < 3 || masteredWords.length < 5 ? 'unMastered' : 'mastered'  


        if(selectedArray === 'mastered'){
            console.log('Mastered')
        // Pick random item in mastered array, select new item based on the random index
            //### let i = Math.floor(Math.random() * masteredWords.length)
            let i = Math.floor(Math.random() *addToMastered.length)

            //###let masteredWordsCopy = [...masteredWords]
            let masteredWordsCopy = [...addToMastered]

        // Adjust the index if this selection duplicates the last word
            if(masteredWordsCopy[i] === lastWord){
                console.log(`Duplicate-before: i:${i} unMW.length:${masteredWordsCopy.length} word:${masteredWordsCopy[i]}`)
                i === masteredWordsCopy.length-1 ? i = 0 : i++
                console.log(`Duplicate-after: i:${i} unMW.length:${masteredWordsCopy.length} word:${masteredWordsCopy[i]}`)
            } 
        
        // Pull the new word off of the mastered array and set state with the modified values
            let newWord = masteredWordsCopy.splice(i,1)
            newWord = newWord[0]

            this.setState({
                unMasteredWords: [...addToUnMastered],
                masteredWords: [...masteredWordsCopy],
                currentWord: newWord,
                lastWord: currentWord
            })

        }

        if(selectedArray === 'unMastered'){
            console.log('unMastered')
            // Pick random item in mastered array, select new item based on the random index
                let i = Math.floor(Math.random() * addToUnMastered.length)
    
                let unMasteredWordsCopy = [...addToUnMastered]
    
            // Adjust the index if this selection duplicates the last word
                if(unMasteredWordsCopy[i] === lastWord){
                    console.log(`Duplicate-before: i:${i} unMW.length:${unMasteredWordsCopy.length}word:${unMasteredWordsCopy[i]}`)
                    i === unMasteredWordsCopy.length-1 ? i = 0 : i++
                    console.log(`Duplicate-after: i:${i} unMW.length:${unMasteredWordsCopy.length}word:${unMasteredWordsCopy[i]}`)
                } 
            
            // Pull the new word off of the mastered array and set state with the modified values
                let newWord = unMasteredWordsCopy.splice(i,1)
                newWord = newWord[0]

                let finalWord = unMasteredWordsCopy.length === 0;                
    
                this.setState({
                    unMasteredWords: [...unMasteredWordsCopy],
                    masteredWords: [...addToMastered],
                    currentWord: newWord,
                    lastWord: currentWord,
                    finalWord: finalWord
                })
                if(finalWord){
                    this.finalWordSetup(newWord)

                }
        }
    }

    finalWordSetup(newWord){
        console.log('finalWordSetupFired')
        let lastWordArray = [...this.state.masteredWords]
        let selectedWords = []

        for(let i=1; i<=4; i++){
        let dice = Math.floor(Math.random() * lastWordArray.length)
        let selection = lastWordArray.splice(dice,1)
        selectedWords.push(selection[0])
        }
        this.setState({
            unMasteredWords: [...selectedWords, newWord],
            lastWord: this.state.currentWord,
            masteredWords:null,
        })
    }

    lastWordCycle(){
        console.log('lastWordCycle fired')
        let {unMasteredWords} = this.state
        let wordArray = [...unMasteredWords]
        let word = wordArray.shift()
        console.log(word)
        this.setState({
            currentWord: word,
            unMasteredWords: wordArray,
        })

    }
    
        
    btnCorrect(){
        let wordAdjust = this.state.currentWord
        wordAdjust.hit++
        if(this.state.finalWord === false){
            if(wordAdjust.hit > this.state.masteryThreshold){
                this.setState({
                    lastWord: wordAdjust,
                    masteredWords: [...this.state.masteredWords, wordAdjust],
                    currentWord: '',
                })
            } else {
                this.setState({
                    lastWord: wordAdjust,
                    unMasteredWords: [...this.state.unMasteredWords, wordAdjust],
                    currentWord: '',
                })
            }
            this.cycleWords();
        } else {
            // This runs when there is only one word left in the barrel
            if(wordAdjust.hit >= this.state.masteryThreshold){
                // celebrate()
            } else if(this.state.unMasteredWords.length === 0){
                this.finalWordSetup();
                
            } 

            this.lastWordCycle();
        }

    }
    
    
    btnIncorrect(){
        let wordAdjust = this.state.currentWord
        wordAdjust.miss++
        if(this.state.finalWord === false){

            this.setState({
                lastWord: wordAdjust,
                unMasteredWords: [...this.state.unMasteredWords, wordAdjust[0]],
                currentWord: '',
            })
            this.cycleWords()
        }
    }

        
    render(){
        let cardText = this.state.currentWord.word ? this.state.currentWord.word : 'All done!'

        let greenColor='#1cdb8b';
        let redColor='#e54b60';
        
            
        return(
            <div className='card-container'>
                <Card 
                    text={cardText}
                    // text={this.state.currentWord.word}
                />
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