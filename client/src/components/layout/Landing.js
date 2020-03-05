import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="col s6">
              <Link
                to="/registerTeacher"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register Teacher
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/loginTeacher"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In Teacher
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/registerStudent"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register Student
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/loginStudent"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In Student
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;