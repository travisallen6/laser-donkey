import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Image from './Components/Image'
import Card from './Components/Card'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Image 
            imageSource={logo}
            wide='80'
            high='80'/>
          
          <h1>Poke Sight Words</h1>
        </div>
        <Card>Sight Word</Card>
      </div>
    );
  }
}

export default App;
