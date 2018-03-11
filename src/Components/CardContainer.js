import React, {Component} from 'react'
import './CardContainer.css'
import Button from './Button'
import Card from './Card'

export default class CardContainer extends Component {
    constructor(props){
        super(props)
        
        let rawWords = ['all', 'am', 'are','at','ate','be','black','brown','but','came',]
        // 'did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went','what','white','who','will','with','yes','red','blue','green','yellow','pink','purple','orange']

        let objectArray = []
        rawWords.map( val => objectArray.push({word: val,hit: 0, miss:0}))
        
        let startIndex = Math.floor(Math.random() * objectArray.length)
        
        let startWord = objectArray.splice(startIndex,1)

        this.state = {
            unMasteredWords: objectArray,
            masteredWords: [],
            currentWord: startWord[0],
            currentWordIndex: startIndex,
            lastWord: '',
            finalWord: false
        }
        this.btnCorrect = this.btnCorrect.bind(this)
        this.btnIncorrect = this.btnIncorrect.bind(this)
    }
    
    
    cycleWords(){
        let { unMasteredWords, masteredWords, currentWord, currentWordIndex, lastWord } = this.state

        //Put the old word back where it belongs depending on if mastery was achieved or not
        let addToMastered = currentWord.hit >= 5 ? [...masteredWords, currentWord] : [...masteredWords];
        let addToUnMastered = currentWord.hit < 5 ? [...unMasteredWords, currentWord] : [...unMasteredWords];

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
                currentWordIndex: i,
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

                let finalWord = unMasteredWordsCopy.length === 1 ? true : false;                
    
                this.setState({
                    unMasteredWords: [...unMasteredWordsCopy],
                    masteredWords: [...addToMastered],
                    currentWord: newWord,
                    currentWordIndex: i,
                    lastWord: currentWord,
                    finalWord: finalWord
                })
    
            }

    }
    
        
    btnCorrect(){
        let wordAdjust = this.state.currentWord
        wordAdjust.hit++
        if(wordAdjust.hit > 1){
            this.setState({
                lastWord: wordAdjust,
                masteredWords: [...this.state.masteredWords, wordAdjust],
                currentWord: '',
                currentWordIndex: '',
            })
        } else {
            this.setState({
                lastWord: wordAdjust,
                unMasteredWords: [...this.state.unMasteredWords, wordAdjust],
                currentWord: '',
                currentWordIndex: '',
            })
        }
        this.cycleWords();
    }
    
    btnIncorrect(){
        let wordAdjust = this.state.currentWord
        wordAdjust.miss++
        this.setState({
            lastWord: wordAdjust,
            unMasteredWords: [...this.state.unMasteredWords, wordAdjust[0]],
            currentWord: '',
            currentWordIndex: '',
        })
        this.cycleWords()
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