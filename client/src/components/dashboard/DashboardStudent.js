import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getStudentAssignments } from "../../api/assignmentApi"

class DashboardStudent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      assignments: [],
    }
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await getStudentAssignments(this.props.auth.user.username).then(assignments => {
      this.setState({
        assignments: assignments.data.data
      })
    })
  };

 viewAssignment = (assignment_name) => {
    var route = '/' + assignment_name + '/assignment';
    this.props.history.push(route);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { assignments } = this.state;
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
                  <th>Assignment Name</th>
                  <th>Score</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  assignments.map((assignment, i) => {
                    return (
                      <tr key={i} onClick={this.viewAssignment.bind(this, assignment.assignment_name)}>
                        <td>
                          {assignment.assignment_name}
                        </td>
                        <td>
                          {assignment.assignment_score}
                        </td>
                        <td>
                          {assignment.assignment_due_date}
                        </td>
                        <td>
                          {assignment.assignment_status}
                        </td>
                      </tr>
                    );
                  })
                } 
              </tbody>
            </table>
            
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
DashboardStudent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps, { logoutUser }
)(DashboardStudent);