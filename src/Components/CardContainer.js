import React, {Component} from 'react'
import './CardContainer.css'
import Button from './Button'
import './Button.css'
import Card from './Card'
import axios from 'axios'
import WordSettings from './WordSettings'
import Pokemon from './Pokemon'


export default class CardContainer extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            masteryThreshold: 3,
            rawWordList: [], 
            unMasteredWords: [],
            masteredWords: [],
            currentWord: '',
            lastWord: '',
            isFinalWord: false,
            finalWord: '',
            finalWordList: [],
            finalWordIndex: 1,
            complete:false,
            wordSettings:false,
        }
        this.btnCorrect = this.btnCorrect.bind(this)
        this.btnIncorrect = this.btnIncorrect.bind(this)
        this.setWords = this.setWords.bind(this)
        this.editWordsAxios = this.editWordsAxios.bind(this)
        this.toggleWordSettings=this.toggleWordSettings.bind(this)
    }
    
    prepWordsForGame(array){
        let objectArray = []
        array.map( val => objectArray.push({word: val,hit: 0, miss:0}))
        return objectArray;
    }
    
    getStartingWord(array){
        let startIndex = Math.floor(Math.random() * array.length)
        let startWord = array.splice(startIndex,1)
        startWord = startWord[0]
        return startWord
    }
    
    componentDidMount(){
            let promise = axios.get('/api/')
            promise.then( res => {
                let rawWordList = res.data
                let prepWordList = this.prepWordsForGame(rawWordList)
                let firstWord = this.getStartingWord(prepWordList)

                this.setState({
                    unMasteredWords: prepWordList,
                    currentWord: firstWord,
                    rawWordList: rawWordList
                })
            })
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

                let isFinalWord = unMasteredWordsCopy.length === 0;                
                
                this.setState({
                    unMasteredWords: [...unMasteredWordsCopy],
                    masteredWords: [...addToMastered],
                    currentWord: newWord,
                    lastWord: currentWord,
                    isFinalWord: isFinalWord
                })
                if(isFinalWord){
                    this.finalWordSetup(newWord)

                }
            }
    }
    
    finalWordSetup(newWord){
        var selectedArray =[]
        let index
        let lastIndex
        
        for(let i=1; i<=50; i++){
            let arrayCopy = [...this.state.masteredWords]
            index = Math.floor(Math.random()*arrayCopy.length)
            if(lastIndex===index){
                index = index===arrayCopy.length-1?0:index+1
            }
            selectedArray.push(arrayCopy[index])
            lastIndex=index
        }
        this.setState({
            finalWordList:selectedArray,
            finalWord: newWord,
        })
    }
    
    
    
    lastWordCycle(updatedWord){
        let {finalWordIndex,finalWordList,finalWord} = this.state
        console.log(finalWordIndex+"::"+finalWordList.length+"::"+(finalWordIndex >= finalWordList.length))
        let index = finalWordIndex >= finalWordList.length ? 1 : finalWordIndex+1
        
        let finalWordToDisplay = updatedWord.word === finalWord.word?updatedWord:finalWord
        let wordToDisplay = index %5 === 0 ? finalWordToDisplay : finalWordList[index]
        
        this.setState({
            currentWord: wordToDisplay,
            finalWord: finalWordToDisplay,
            finalWordIndex: index,
        })
    }

    
    btnCorrect(){
        let {isFinalWord,currentWord,masteryThreshold,masteredWords,unMasteredWords, finalWord} = this.state

        if(isFinalWord === false){
            let wordAdjust = currentWord
            wordAdjust.hit++
            if(wordAdjust.hit > masteryThreshold){
                this.setState({
                    lastWord: wordAdjust,
                    masteredWords: [...masteredWords, wordAdjust],
                    currentWord: '',
                })
            } else {
                this.setState({
                    lastWord: wordAdjust,
                    unMasteredWords: [...unMasteredWords, wordAdjust],
                    currentWord: '',
                })
            }
            this.cycleWords();

        } else {
            let wordAdjust = currentWord
            wordAdjust.hit++
            if(finalWord.word === wordAdjust.word){
                if(wordAdjust.hit >= masteryThreshold){
                    this.setState({finalWord: wordAdjust, currentWord: wordAdjust})
                    alert('Woohoo!')
                    // Celebrate!
                } else {
                    this.lastWordCycle(wordAdjust)
                } this.lastWordCycle(wordAdjust)
            } else {
                this.lastWordCycle(wordAdjust)
            }
            // This runs when there is only one word left in the barrel
            

        }

    }
    
    
    btnIncorrect(){
        if(this.state.isFinalWord === false){
            
            let wordAdjust = this.state.currentWord
            wordAdjust.miss++
            this.setState({
                lastWord: wordAdjust,
                unMasteredWords: [...this.state.unMasteredWords, wordAdjust[0]],
                currentWord: '',
            })
            this.cycleWords()
        }else {
            let wordAdjust = this.state.currentWord
            wordAdjust.miss++
            this.lastWordCycle(wordAdjust);
        } 

    }

    setWords(updatedArray){
        let prepArray = this.prepWordsForGame(updatedArray)
        let firstWord = this.getStartingWord(prepArray)

        this.setState({
            unMasteredWords: prepArray,
            masteredWords: [],
            currentWord: firstWord,
            lastWord: '',
            isFinalWord: false,
            finalWord: '',
            finalWordList: [],
            finalWordIndex: 1,
            complete:false,
        })
        this.toggleWordSettings=this.toggleWordSettings.bind(this)
    }

    editWordsAxios(oldWord,newWord){
        let changedWord = {word: newWord}
        let promise=axios.put(`/api/${oldWord}`,changedWord)
        promise.then( res => {
            let updatedArray=res.data;
            this.setWords(updatedArray)

            })
        }

    toggleWordSettings(){
        console.log(this.state)
        let toggle = !this.state.wordSettings
        this.setState({
            wordSettings: toggle
        })
    }

    
    
        
    render(){
        let cardText = this.state.currentWord.word
        let greenColor='#1cdb8b';
        let redColor='#e54b60';
        console.log(this.state.wordSettings)
        
        return(
            <div className='card-container'>
                {this.state.wordSettings && <WordSettings 
                    setWordsCb={this.setWords}
                    rawWordsList={this.state.rawWordList}
                    editWordsAxios={this.editWordsAxios}
                    toggleWordSettings={this.toggleWordSettings}    
                />}
                <Pokemon />
                <Card 
                    text={cardText}
                    // text={this.state.currentWord.word}
                />
                <div className='button-container'>
                   <Button
                        className='Button Button-round'  
                        btnColor={greenColor}
                        btnFn={this.btnCorrect} 
                        btnTxt='&#10004;'
                    />
                    <Button
                        className='Button Button-round'
                        btnColor={redColor}
                        btnFn={this.btnIncorrect} 
                        btnTxt='&#10008;'
                    />
                </div>
            </div>
        )
    }
}