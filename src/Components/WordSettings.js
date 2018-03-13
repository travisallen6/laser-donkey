import React, {Component} from 'react'
import './WordSettings.css'
import axios from 'axios'
import ListItem from './ListItem'

export default class WordSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            addWordInput: '',
            wordList: ''

        }
        this.refreshWords = this.refreshWords.bind(this)
    }
    

    refreshWords(){
        let setArray = [...this.props.allWordsList]
        this.setState({
            wordList: setArray
        }) 
    }
    
    handleAddWordInput(value){
        this.setState({addWordInput: value})
    }


    addNewWord(word){
        let promise=axios.post('/api',{word})
        promise.then( (res)=>{
            console.log('response:'+ res)
            let updatedArray = res.data
            let firstWord = res.data[0]
            this.setState({
                wordList: updatedArray,
                addWordInput: ''
            })
            this.props.wordsSetFn(updatedArray, firstWord)
        })
    }

    editItem(oldWord,newWord){
        let promise = axios.put(`/api/${oldWord}`, {word: newWord})
        promise.then( (res) => {
            this.props.updateFn(res.data) 
            this.setState({
                word:newWord
            })
        })
    }





    render(){

        let wordDisplay = this.props.allWordsList.map( (val, i) => <h2 key={i}> {val.word} </h2>);

        return (
            <div style={this.props.display} className='wordsettings-container'>
                <div className='wordsettings-list-background'>
                    <div>
                        <h1>Add a Word</h1><input value={this.state.addWordInput} onChange={(e) => this.handleAddWordInput(e.target.value)} /><button onClick={()=>this.addNewWord(this.state.addWordInput)}>Add</button>
                    </div>
                    <div>
                        <div className="current-words">
                            <h2>Current Words</h2>
                            <button onClick={this.refreshWords}>Refresh</button>
                            {wordDisplay}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}