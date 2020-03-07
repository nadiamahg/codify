import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getClassrooms, deleteClassroom } from "../../api/classroomApi";
import { getAssignments} from "../../api/assignmentApi";
import "./Dashboard.css";
import M from "materialize-css";


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
        return <button className="btn-floating waves-effect waves-light hoverable red" style={{marginTop: "50px"}} onClick={this.deleteUser}><i className="material-icons">delete</i></button>
    }
}

class DashboardTeacher extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classrooms: [],
      assignments: [],
      isLoading: true,
      isLoading2: true,
    }
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    this.setState({ isLoading2: true })

    await getClassrooms(this.props.auth.user.username).then(classrooms => {
      this.setState({
        classrooms: classrooms.data.data
      })
      this.setState({ isLoading: false })
    })

    await getAssignments(this.props.auth.user.username).then(assignments => {
      this.setState({
        assignments: assignments.data.data
      })
      this.setState({ isLoading2: false })
    })

    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  };

 viewAssessments = (class_name) => {
    var route = '/' + class_name + '/assignments';
    this.props.history.push(route);
  }

  viewAssignment = (assignment_name) => {
    var route = '/' + assignment_name;
    this.props.history.push(route);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  createCardContent = function() {
    var x = []
    for(var y = 0; y < this.state.classrooms.length; y ++) {
      x.push(<div className="card--content center-align hoverable waves-effect waves-light" key={y} onClick={this.viewAssessments.bind(this, this.state.classrooms[y].class_name)}>
              <b><h6>{this.state.classrooms[y].class_name}</h6></b><b> Class Code: </b>{this.state.classrooms[y].class_code} <br/> <DeleteClassroom class_name={this.state.classrooms[y].class_name} class_code={this.state.classrooms[y].class_code}/></div>)
    }
    return (x);
  }

  createCardContentAssessments = function() {
    var x = []
    for(var y = 0; y < this.state.assignments.length; y ++) {
      x.push(<div className="card--content center-align hoverable waves-effect waves-light" key={y} onClick={this.viewAssignment.bind(this, this.state.assignments[y].assignment_name)}>
              <h6><b>{this.state.assignments[y].assignment_name}</b></h6></div>)
    }
    return (x);
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container valign-wrapper">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s12">
            <h4 className="center-align">
              <b>Hey there,</b> {user.first_name} {user.surname}
            </h4>
          </div>
          <div className="col s12">
            <br></br><h4>Classrooms</h4>
          </div>
            <div className="col s10">
            {(this.state.isLoading) ? <div> Loading </div> :
              <section className="card">
                {this.createCardContent()}
              </section>}
            </div>
            <div className="col s2">
              <Link
                  to="/newClassroom"
                  style={{
                    marginTop: "70px"
                  }}
                  className="btn-floating btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  <i className="material-icons">add</i>
                </Link>
            </div>
             <div className="col s12">
            <br></br><h4>Assignments</h4>
          </div>
            <div className="col s10">
            {(this.state.isLoading2) ? <div> Loading </div> :
              <section className="card">
                {this.createCardContentAssessments()}
              </section>}
            </div>
            <div className="col s2">
              <Link
                  to="/newAssignment"
                  style={{
                    marginTop: "70px"
                  }}
                  className="btn-floating btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  <i className="material-icons">add</i>
                </Link>
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