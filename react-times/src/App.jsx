import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import NavBar from "./layout/NavBar";
import {BACKGROUND_COLOR} from "./services/colorService";

class App extends Component {

  componentDidMount(){
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }

  render() {

    return (
        <BrowserRouter>
          <div className="container-fluid">
            <NavBar/>
            <div>
              {/* <hr className="bg-white"/> */}
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/timer">
                  <Timer />
                </Route>
                <Route path="/stopwatch">
                  <Stopwatch />
                </Route>
                <Route path="/clock">
                  <Clock />
                </Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
