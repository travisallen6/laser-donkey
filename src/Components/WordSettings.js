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
        this.editItem = this.editItem.bind(this)
        this.toggleWordSettings=this.toggleWordSettings.bind(this)
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
        
    }

    editItem(oldWord,newWord){
        this.props.editWordsAxios(oldWord, newWord)
      
    }

    toggleWordSettings(){
        this.props.toggleWordSettings()
    }




    render(){

    let wordDisplay = this.props.rawWordsList.map( (val, i) => {
        return(
            <ListItem 
                key={i} 
                word={val}
                editCb={this.editItem}
                deleteCb={this.deleteItem}
             />
        )
    })
    


        return (
            <div style={this.props.display} 
                className='wordsettings-container'>
                <div className='wordsettings-list'>
                    <div className='wordsettings-create-word'>
                        <div><h2>Add a Word</h2></div>
                        <div className='wordsettings-add-input-group'>
                            <input 
                                value={this.state.addWordInput}
                                onChange={(e)=>this.handleAddWordInput(e.target.value)}
                                />
                            <div className='wordsettings-addWord-btn'>Add</div>
                        </div>
                    </div>
                    <div className='current-words'>
                        <h2>Current Words</h2>
                        {wordDisplay}
                        <div className='wordsettings-close-btn-container'>
                            <div 
                                className='wordsettings-close-btn'
                                onClick={ ()=>this.toggleWordSettings() }>
                                Close
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}