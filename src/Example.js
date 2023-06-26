import React from 'react'
import SlotMachine from './SlotMachine'

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
      }, 1200)
    })
  }

  // 完成回调
  finish = () => {
    console.log('完成一次')
  }

  render() {
    return <div>
      <SlotMachine ref={(app) => { this._app = app; }} result={this.state.result} onFinished={this.finish} />
      <button
        aria-label='Play again.'
        id='repeatButton'
        onClick={this.start}>
      </button>
    </div>
  }
}

export default Example