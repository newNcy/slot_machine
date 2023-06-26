import React from 'react'

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  componentDidMount() {
    this.setState({
      position: this.setStartPosition()
    })
    // this.reset()
    // clearInterval(this.timer);

    // this.setState({
    //   position: this.start,
    //   timeRemaining: this.props.timer
    // });

    // this.timer = setInterval(() => {
    //   this.tick()
    // }, 100);
  }

  forceUpdateHandler() {
    console.log(this.props.target)
    this.reset();
  };

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition();

    this.startTime = Date.now()

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  state = {
    position: 0,
    lastPosition: null
  }

  lastPosition = null
  static iconHeight = 188;
  multiplier = Math.floor(Math.random() * (4 - 1) + 3);

  // start = this.setStartPosition();


  setStartPosition() {
    return ((Math.floor((Math.random() * 9))) * Spinner.iconHeight) * -1;
  }

  speed = Spinner.iconHeight * 2//* this.multiplier;
  moveBackground() {
    const nextPosition = this.state.position - this.speed
    this.setState({
      position: this.lastPosition ? Math.max(nextPosition, this.lastPosition) : nextPosition,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    const totalSymbols = 9;
    const maxPosition = (Spinner.iconHeight * (totalSymbols - 1) * -1);
    let moved = (this.props.timer / 100) * this.multiplier
    let currentPosition = this.start;

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }
    const dis = this.state.position / -188
    console.log(this.props.z, dis % 9, currentPosition / -188 + 1)
    this.props.onFinish(this.state.position % -9);
  }

  tick() {
    // 最少滚动1s
    // if ((Date.now() - this.startTime) >= 1000) {
    // 每次监测结果传入，从而计算最终位置
    if (!isNaN(this.props.target) && !this.lastPosition) {
      const curRate = this.state.position / -188
      const curIndex = curRate % 9 + 1

      const x = this.props.target >= (curIndex) ? this.props.target - curIndex : 9 + this.props.target - curIndex

      this.lastPosition = this.state.position - 188 * x - this.props.z * 1692

      console.log('开始计算', this.props.target, this.state.position, curIndex, this.lastPosition)

    } else {
      if (this.state.position <= this.lastPosition && this.lastPosition !== null) {
        clearInterval(this.timer);
        this.lastPosition = null
        // this.getSymbolFromPosition();
        console.log(`${this.props.z}已经计算完成`, this.lastPosition)
        this.props.onFinish(this.state.position % -9);
        return
      }
      // console.log(this.start, this.speed, this.state.position)
      // clearInterval(this.timer);
    }

    // }
    this.moveBackground();

  }

  render() {
    let { position, current } = this.state;

    return (
      <div
        style={{ backgroundPosition: '0px ' + position + 'px' }}
        className={`icons`}
      />
    )
  }
}


export default Spinner