import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import RegisterStudent from "./components/auth/RegisterStudent";
import LoginStudent from "./components/auth/LoginStudent";
import RegisterTeacher from "./components/auth/RegisterTeacher";
import LoginTeacher from "./components/auth/LoginTeacher";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register_student" component={RegisterStudent} />
          <Route exact path="/login_student" component={LoginStudent} />
          <Route exact path="/register_teacher" component={RegisterTeacher} />
          <Route exact path="/login_teacher" component={LoginTeacher} />
        </div>
      </Router>
    );
  }
}
export default App;