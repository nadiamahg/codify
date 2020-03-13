import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
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
      this.setState({isLoading: false })
    })
  };

 viewAssignment = (assignment_name) => {
    var route = '/' + assignment_name + '/assignment';
    this.props.history.push(route);
  }

  createCardContentAssessments = function() {
    var x = []
    for(var y = 0; y < this.state.assignments.length; y ++) {
      var date = new Date(this.state.assignments[y].assignment_due_date);
      date = date.toLocaleDateString();
      x.push(<div class="card--content center-align hoverable waves-effect waves-light" onClick={this.viewAssignment.bind(this, this.state.assignments[y].assignment_name)}>
              <h6><b>{this.state.assignments[y].assignment_name}</b></h6><h6><b>Due Date: </b>{date}</h6> <h6><b>Score: </b>{this.state.assignments[y].assignment_score}</h6><h6><b>{this.state.assignments[y].assignment_status}</b></h6></div>)
    }
    return (x);
  }

  render() {
    const { user } = this.props.auth;
    const { assignments } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.first_name} {user.surname}
            </h4>
          </div>
          <div className="col s12">
              <h4>
                Assignments
              </h4>
            </div>
            {this.state.isLoading ? <div> You have no assignments </div> : 
            <div className="col s12"> <section class="card">
                {this.createCardContentAssessments()}
              </section>
            </div>
            }
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