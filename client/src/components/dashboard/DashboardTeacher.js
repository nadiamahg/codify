import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getClassrooms, deleteClassroom } from "../../api/classroomApi"

class DeleteClassroom extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the class ${this.props.class_name} permanently?`,
            )
        ) {
            deleteClassroom(this.props.class_name, this.props.class_code)
            window.location.reload()
        }
    }

    render() {
        return <button onClick={this.deleteUser}>Delete</button>
    }
}

class DashboardTeacher extends Component {

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

 viewAssessments = (class_name) => {
    var route = '/' + class_name + '/assignments';
    this.props.history.push(route);
  }

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
            <table className="striped">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Class Code</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  classrooms.map((classroom, i) => {
                    return (
                      <tr key={i} onClick={this.viewAssessments.bind(this, classroom.class_name)}>
                        <td>
                          {classroom.class_name}
                        </td>
                        <td>
                          {classroom.class_code}
                        </td>
                        <td>

                            <DeleteClassroom class_name={classroom.class_name} class_code={classroom.class_code}/>
                        
                        </td>
                      </tr>
                    );
                  })
                } 
              </tbody>
            </table>
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
              <Link
                to="/newAssignment"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                New Assignment
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
DashboardTeacher.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps, { logoutUser }
)(DashboardTeacher);