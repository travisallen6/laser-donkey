import React, {Component} from 'react'
import axios from 'axios'

export default class Pokemon extends Component{
    constructor(){
        super()
        this.state = {
            picUrl: ''
        }
    }

    componentDidMount(){
        let promise = axios.get('https://pokeapi.co/api/v2/pokemon/23')
        promise.then( (res)  => {
            this.setState({
                picUrl: res.data.sprites.front_default
            })
        })
    } 
    

    render(){
        return(
            <div></div>
        )
    }
}