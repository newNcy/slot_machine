
import React from 'react'
import Spinner from './Spinner'
import './App.css';

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
      a: []
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();

    // this.getRes().then(() => {
    //   console.log('done1')

    //   this.setState({
    //     a: [1, 2, 4]
    //   })
    // })

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
      const { winner } = this.state;
      const first = App.matches[0];
      let results = App.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    App.matches = [];
  }


  getRes() {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, 3000)
    })
  }

  componentDidMount() {
    // this.getRes().then(() => {
    //   console.log('done')

    //   this.setState({
    //     a: [1, 2, 4]
    //   })
    // })
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {
      return App.loser[Math.floor(Math.random() * App.loser.length)]
    }
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }

    if (winner) {
      winningSound = <WinningSound />
    }

    const { a } = this.props
    return (
      <div>
        {winningSound}


        <div className={`spinner-container`}>
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" z="a" target={a[0]} />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" z="b" target={a[1]} />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" z="c" target={a[2]} />
          <div className="gradient-fade"></div>
        </div>
      </div>
    );
  }
}




export default App