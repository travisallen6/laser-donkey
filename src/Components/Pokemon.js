import React, {Component} from 'react'
import axios from 'axios'

import './Pokemon.css'

export default class Pokemon extends Component{
    constructor(){
        super()
        this.state = {
            picUrl: '',
            pokeName: '',
            pokeNameDisplay: false
        }
        this.togglePokeName=this.togglePokeName.bind(this)
        setInterval(()=>this.getPokemon(), 10000)
    }

    getPokemon(){
        let pokePick = Math.ceil(Math.random() * 299)
        let promise = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokePick}`)
        promise.then( (res)  => {
            console.log(res)
            this.setState({
                picUrl: res.data.sprites.front_default,
                pokeName: res.data.name

            })
        })
     
    }

    componentDidMount(){
        this.getPokemon()
    } 

    togglePokeName(){
        console.log(this.state.togglePokeName)
        this.setState({
            pokeNameDisplay: !this.state.pokeNameDisplay
        })
        console.log(this.state.togglePokeName)
    }
    

    render(){
        let pokemonName = this.state.pokeNameDisplay?this.state.pokeName:null;
        let pokemonPicture = this.state.picUrl?(
            <div
                onClick={()=>this.togglePokeName()}>
                                                    
                <img src={this.state.picUrl} 
                alt=''/>
            </div>
        ):null
        return(
            <div className='pokeDiv'>
                <div className='pokeDivName'>
                    <h2>
                        {pokemonName}
                    </h2>

                </div>
                {pokemonPicture}
            </div>
        )
    }
}

                

