import React, {Component} from 'react'
import './ListItem.css'

export default class ListItem extends Component {
        constructor(props){
                super(props)
                this.state = {
                        editInput: '',
                        toggleEditBox
                }
        }

        editItem(oldWordValue){
                let editedWord = this.state.editInput
                this.props.editCb(oldWordValue,editedWord)
        }

        toggleEditBox(){
                this.setState({
                        // toggleEditBox
                })
        }

        render(){

        return(
        <div className='ListItem-container'>
                <div className='crud-title' >
                        {this.props.word}
                </div>
                <div className='crud-btn-container'>
                        <div 
                                className='crud-btn crud-edit'
                                onClick={()=>this.editItem(this.props.word)}
                        >edit</div>
                        <div
                                className='crud-btn crud-delete'
                                onClick={()=>this.deleteItem(this.props.word)}
                        >delete</div>
                </div>
        </div>
        )
        }
}
