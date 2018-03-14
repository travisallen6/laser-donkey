import React, {Component} from 'react'
import './ListItem.css'

export default class ListItem extends Component {
        constructor(props){
                super(props)
                this.state = {
                        editInput: this.props.word,
                }
        }

        editItem(){
                let editedWord = this.state.editInput
                this.props.editCb(this.props.word,editedWord)
        }

        handleInput(value){
                this.setState({
                        editInput:value
                })
        }


        render(){

        return(
        <div className='ListItem-container'>
                <div className="crud-title">
                        <input 
                                type="text" 
                                value={this.state.editInput} 
                                className="edit-input"
                                onChange={(e)=>this.handleInput(e.target.value)}
                        />
                </div>
                <div className='crud-btn-container'>
                        <div 
                                className="crud-btn crud-edit"  
                                onClick={()=>this.editItem(this.props.word)}>
                                edit
                        </div>
                        <div
                                className='crud-btn crud-delete'
                                onClick={()=>this.deleteItem(this.props.word)}
                        >delete</div>
                </div>
        </div>
        )
        }
}
