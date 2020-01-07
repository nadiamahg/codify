import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getClassrooms } from "../../api/classroomApi"

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classrooms: [],
    }
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await getClassrooms(this.props.auth.user.username).then(classrooms => {
      this.setState({
        classrooms: classrooms.data.data
      })
    })
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { classrooms } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.first_name} {user.surname}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <div>
            classnames:
                {
                  classrooms.map((classroom, i) => {
                    return (
                      <div key={i}>
                        {classroom.class_name}

                      </div>
                    );
                  })
                } 
            </div>
            <Link
                to="/newClassroom"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                New Classroom
              </Link>
              
            
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Log Out
            </button>
          </div>
        </div>
      </div>



    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps, { logoutUser }
)(Dashboard);