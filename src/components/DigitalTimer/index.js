import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    status: false,
    seconds: 0,
    initialMinutes: 25,
    intervalId: null,
  }

  // Clear interval correctly
  clearIntervalId = () => {
    const {intervalId} = this.state
    if (intervalId) {
      clearInterval(intervalId)
      this.setState({intervalId: null})
    }
  }

  // Start/Stop Timer
  startTimer = () => {
    const {status} = this.state
    if (!status) {
      const intervalId = setInterval(this.getStartTimer, 1000)
      this.setState({status: true, intervalId})
    } else {
      this.clearIntervalId()
      this.setState({status: false})
    }
  }

  // Timer Logic
  getStartTimer = () => {
    this.setState(prevState => {
      const {minutes, seconds} = prevState
      if (minutes === 0 && seconds === 0) {
        this.clearIntervalId()
        return {status: false}
      }
      if (seconds === 0) {
        return {
          minutes: minutes - 1,
          seconds: 59,
        }
      }
      return {
        seconds: seconds - 1,
      }
    })
  }

  // Increase Timer
  onIncreaseMinutes = () => {
    const {status} = this.state
    if (!status) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        initialMinutes: prevState.initialMinutes + 1,
      }))
    }
  }

  // Decrease Timer
  onDecreaseMinutes = () => {
    const {status, minutes} = this.state
    if (!status && minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        initialMinutes: prevState.initialMinutes - 1,
      }))
    }
  }

  // Reset Timer
  onResetTimer = () => {
    this.clearIntervalId()
    this.setState({
      minutes: 25,
      seconds: 0,
      status: false,
      initialMinutes: 25,
    })
  }

  // Format Time
  formatTime = time => (time < 10 ? `0${time}` : time)

  render() {
    const {minutes, seconds, status, initialMinutes} = this.state

    const btnImage = status
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const btnText = status ? 'Pause' : 'Start'
    const timeStatusText = status ? 'Running' : 'Paused'

    return (
      <div className="main-container">
        <div className="inner-container">
          <h1 className="timer-head">Digital Timer</h1>
          <div className="main-inner-card">
            <div className="left">
              <div className="timer-inside-container">
                <h1 className="btn-head">
                  {this.formatTime(minutes)}:{this.formatTime(seconds)}
                </h1>
                <p>{timeStatusText}</p>
              </div>
            </div>
            <div className="right">
              <div className="button-side-container">
                <div className="align">
                  <button
                    type="button"
                    className="btn-style"
                    onClick={this.startTimer}
                  >
                    <img src={btnImage} alt="play icon" className="icon" />
                  </button>
                  <h1>{btnText}</h1>
                </div>
                <div className="align">
                  <button
                    type="button"
                    className="btn-style"
                    onClick={this.onResetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                    />
                  </button>
                  <h1>Restart</h1>
                </div>
              </div>
              <p>Set Timer Limit</p>
              <div className="limit-container">
                <button
                  type="button"
                  className="btn-style-1"
                  onClick={this.onDecreaseMinutes}
                >
                  -
                </button>
                <div className="min-cont">{initialMinutes}</div>
                <button
                  type="button"
                  className="btn-style-1"
                  onClick={this.onIncreaseMinutes}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
