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
            this.setState({
                addWordInput: ''
            })
            this.props.setWordsCb(updatedArray)
        })
    }

    editItem(oldWord,newWord){
        this.props.editWordsAxios(oldWord, newWord)
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
                    <div className='current-words'>
                        <h2>Current Words</h2>
                        {wordDisplay}
                    </div>
                </div>
            </div>
        )
    }
}