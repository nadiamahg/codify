import React, { Component } from "react";
import { Link } from "react-router-dom";
import computer from "../../images/computer.png"
import "./Landing.css"
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s5 center-align main-button-positions">
            <Link
                to="/loginTeacher"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginBottom: "40px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                I am a <b>Teacher</b>
              </Link>
              <br></br>
              <Link
                to="/loginStudent"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                 I am a <b>Student</b>
              </Link>
          </div>
          <div className="col s7">
            <img class="responsive-img" src={computer} alt="Computer"/>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;