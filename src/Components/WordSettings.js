import React, {Component} from 'react'
import './WordSettings.css'
import axios from 'axios'
import ListItem from './ListItem'

export default class WordSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            addWordUserInput: '',
            wordList: ''

        }
        this.refreshWords = this.refreshWords.bind(this)
    }
    

    refreshWords(){
        let setArray = [...this.props.allWordsList]
        console.log(setArray)
        this.setState({
            wordList: setArray
        }) 
    }    

    updateInput(updatedArray){
        this.setState({wordList: updatedArray})
    }

    addNewWord(input){
        let newArray = [...this.state.wordList, input]
        this.setState({wordList: newArray})


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

        let wordDisplay = this.state.wordList ? (this.state.wordList.map( (val, i) => <ListItem key={i} element={val}  />)):'';
        console.log(this.state)

        return (
            <div style={this.props.display} className='wordsettings-container'>
                <div className='wordsettings-list-background'>
                    <div>
                        <h1>Add a Word</h1><input value={this.state.addWordUserInput} onChange={(e) => this.updateAddWordInput(e.target.value)} /><button onClick={this.addNewWord}>Add</button>
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