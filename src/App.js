import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'color',
      clicked: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      clicked: this.state.clicked + 1
    })
    console.log(this.state)
  }

  render() {
    return(
      <header>
        <button 
        id="color-btn"
        className="reset-button press-animation pulse-animation" 
        onClick={this.handleClick}
        >
          <span id="c">c</span><span id="o">o</span><span id="l">l</span><span id="o2">o</span><span id="r">r</span><span>.</span>
        </button>
        <p className="cooltext reveal">I'm</p>
        <div id="name-wrap">
          <h1 id="first-name">FACUNDO</h1>
          <h1 id="last-name">TABÁREZ</h1>
        </div>
        <p className="cooltext reveal">and I make stuff.</p>
      </header>
    );
  }
}

export default App;
