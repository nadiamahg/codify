import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser} from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css"

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import RegisterTeacher from "./components/auth/RegisterTeacher";
import LoginTeacher from "./components/auth/LoginTeacher";
import RegisterStudent from "./components/auth/RegisterStudent";
import LoginStudent from "./components/auth/LoginStudent";
import NewClassroom from "./components/classroom/NewClassroom";
import NewAssignment from "./components/assignment/NewAssignment";
import SetAssignment from "./components/assignment/SetAssignment";
import StudentAssignment from "./components/assignment/StudentAssignment";
import ViewAssignments from "./components/assignment/ViewAssignments";
import ViewAssignment from "./components/assignment/ViewAssignment";
import PrivateRoute from "./components/private-route/PrivateRoute";
import DashboardTeacher from "./components/dashboard/DashboardTeacher";
import DashboardStudent from "./components/dashboard/DashboardStudent";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/registerTeacher" component={RegisterTeacher} />
            <Route exact path="/loginTeacher" component={LoginTeacher} />
            <Route exact path="/registerStudent" component={RegisterStudent} />
            <Route exact path="/loginStudent" component={LoginStudent} />
            <Switch>
              <PrivateRoute exact path="/dashboardTeacher" component={DashboardTeacher} />
              <PrivateRoute exact path="/DashboardStudent" component={DashboardStudent} />
              <PrivateRoute exact path="/newClassroom" component={NewClassroom} />
              <PrivateRoute exact path="/newAssignment" component={NewAssignment} />
              <PrivateRoute exact path="/:class_name/assignments/setAssignment" component={SetAssignment} />
              <PrivateRoute exact path="/:assignment_name/assignment" component={StudentAssignment} />
              <PrivateRoute exact path="/:assignment_name" component={ViewAssignment} />
              <PrivateRoute exact path="/:class_name/assignments" component={ViewAssignments} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;