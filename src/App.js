import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Image from './Components/Image'
import Card from './Components/Card'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      rawWords: ['all', 'am', 'are','at','ate','be','black','brown','but','came','did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went','what','white','who','will','with','yes','red','blue','green','yellow','pink','purple','orange'],
      wordsObject: '',
      
    }
  }
  componentDidMount(){
    //Objectify array data with a hit, miss, and streak count
    let objectArray = []
    this.state.rawWords.map( val => objectArray.push({word: val,hit: 0, miss:0, streak:0}))
    this.setState({wordsObject: objectArray})
  }
  render(){ 
    // let currentWord = cycleWord(wordtrackObject){
      // 

    
    return (
      <div className="App">
        <div className="App-header">
          <Image 
            imageSource={logo}
            wide='80'
            high='80'/>
          
          <h1>Poke Sight Words</h1>
        </div>
        <Card 
          wordsObject={this.state.wordsObject}/>
      </div>
    );
  }
}

export default App;
