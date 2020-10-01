import React, { PureComponent } from "react";
import { BACKGROUND_COLOR, NIGHTMODE_COLOR } from "../services/colorService";

class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      timeString: "",
      dateString: "",
      clockIntervalId: 0,
      isNightModeOn: false,
    };
  }

  componentDidMount() {
    const now = this.getClock();

    this.setClock(now);

    const clockIntervalId = setInterval(this.updateClock, 1000);
    this.setClockIntervalId(clockIntervalId);
  }

  componentWillUnmount() {
    if (this.state.clockIntervalId) clearInterval(this.state.clockIntervalId);
    // BACKGROUND_COLOR === rgb(41,43,44)
    if (document.body.style.backgroundColor !== "rgb(41,43,44)")
      document.body.style.backgroundColor = BACKGROUND_COLOR;
  }

  updateClock = () => {
    const now = this.getClock();

    this.setClock(now);
  };

  setClockIntervalId = (clockIntervalId) => {
    this.setState((prevState) => ({ ...prevState, clockIntervalId }));
  };

  setClock = (now) => {
    const { today, dateString, timeString } = now;
    this.setState((prevState) => ({
      ...prevState,
      today,
      dateString,
      timeString,
    }));
  };

  getClock() {
    const today = new Date();
    const timeString = today.toLocaleTimeString("en-US");
    const dateString = today.toDateString();
    return { dateString, timeString, today };
  }

  onNightModeClick = () => {
    this.toggleNightModeOn();
  };

  toggleBackgroundColor = () => {
    if (this.state.isNightModeOn)
      document.body.style.backgroundColor = NIGHTMODE_COLOR;
    else document.body.style.backgroundColor = BACKGROUND_COLOR;
  };

  toggleNightModeOn = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        isNightModeOn: !prevState.isNightModeOn,
      }),
      () => {
        this.toggleBackgroundColor();
      }
    );
  };

  render() {
    const { dateString, timeString, isNightModeOn } = this.state;

    const NightModeButton = () => {
      return (
        <button
          className={
            isNightModeOn ? "btn btn-sm btn-dark" : "btn btn-sm btn-secondary"
          }
          onClick={this.onNightModeClick}
        >
          Night Mode
        </button>
      );
    };

    return (
      <div className="container-fluid p-3">
        {isNightModeOn ? (
          <div
            className="justify-content-center text-light"
            onClick={this.onNightModeClick}
          >
            <div className="row justify-content-center font-weight-light">
              <h1 className="display-2">
                {timeString ? timeString : `Getting time...`}
              </h1>
            </div>
            <div className="row justify-content-center">
              <p className="h3 font-weight-light">
                {dateString ? dateString : `Getting date...`}
              </p>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center px-md-5">
            <div className="col-md-6">
              <div className="card bg-dark text-white">
                <div className="card-header text-center">
                  <h3 className="card-title font-weight-light">Clock</h3>
                </div>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <h1 className="text-center display-3">
                      {timeString ? timeString : `Getting time...`}
                    </h1>
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-center font-weight-light h4">
                    {dateString ? dateString : `Getting date...`}
                  </div>
                </div>
                <div className="card-body">
                  <div className="row justify-content-end px-3">
                    <NightModeButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Clock;
