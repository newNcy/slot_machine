
import React from 'react'
import Spinner from './Spinner'
import './SlotMachine.css';

function RepeatButton(props) {
  return (
    <button
      aria-label='Play again.'
      id='repeatButton'
      onClick={props.onClick}>
    </button>
  );
}

function WinningSound() {
  return (
    <audio autoplay className="player" preload="false">
      <source src="../public/winning_slot.wav" />
    </audio>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: [],
      result: []
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    setTimeout(() => {
      this._child2.forceUpdateHandler();
    }, 130)
    setTimeout(() => {
      this._child3.forceUpdateHandler();
    }, 230)


  }

  static loser = [
    'Not quite',
    'Stop gambling',
    'Hey, you lost!',
    'Ouch! I felt that',
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];

  static matches = [];

  finishHandler(value) {
    App.matches.push(value);

    if (App.matches.length === 3) {

      this.props.onFinished()
      const { winner } = this.state;
      const first = App.matches[0];
      let results = App.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    App.matches = [];
  }

  render() {
    const { result } = this.props
    return (
      <div>
        <div className={`spinner-container`}>
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" z={1} target={result[0]} />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" z={2} target={result[1]} />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" z={4} target={result[2]} />
          <div className="gradient-fade"></div>
        </div>
      </div>
    );
  }
}




export default App