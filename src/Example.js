import React from 'react'
import App from './App'

class Example extends React.Component {
  state = {
    a: []
  }

  start = () => {
    console.log(2)

    this.setState({
      a: []
    }, () => {
      this._app.handleClick()
    })
    this.getRes().then(() => {
      console.log('done1')

      this.setState({
        a: [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))]
      })
    })
  }

  getRes = () => {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, 10200)
    })
  }

  finish = () => {
    console.log('完成一次')
  }

  render() {
    return <div>
      <App ref={(app) => { this._app = app; }} a={this.state.a} finish={this.finish} />
      <button
        aria-label='Play again.'
        id='repeatButton'
        onClick={this.start}>
      </button>
    </div>
  }
}

export default Example