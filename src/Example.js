import React from 'react'
import SlotMachine from './SlotMachine'


async function getRes() {
}

class Example extends React.Component {
  state = {
    result: []
  }

  start = () => {
    this.setState({
      result: []
    }, () => {
      this._app.handleClick()
    })

    this.getRes().then(() => {
      console.log('done')
      const res = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))]

      console.log(res)
      this.setState({
        result: res
      })
    })
  }

  getRes = () => {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, 3000)
    })
  }

  // 完成回调
  finish = () => {
    console.log('完成一次')
  }

  render() {
    return <div className="bg-blue-300">
      <SlotMachine ref={(app) => { this._app = app; }} result={this.state.result} onFinished={this.finish} />
      <button
        aria-label='Play again.'
        id='repeatButton'
          className = "bg-red-300"
        onClick={this.start}>
      </button>
    </div>
  }
}

export default Example
