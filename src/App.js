import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Image from './Components/Image'
import CardContainer from './Components/CardContainer'

class App extends Component {
    //Objectify array data with a hit, miss, and streak count

  
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <Image 
            imageSource={logo}
            wide='80'
            high='80'/>
          
          <h1>Pok&eacute; Sight Words</h1>
        </div>
        <CardContainer />
      </div>
    );
  }
}

export default App;
