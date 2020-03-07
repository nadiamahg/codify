import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClassroomAssignments, getStudentAssignments } from "../../api/assignmentApi";
import { getStudents } from "../../api/classroomApi";
import classnames from "classnames";
import $ from 'jquery';
import "./Assignment.css"



class ViewAssignments extends Component {

  constructor(props) {
      super(props)
      this.state = {
        assignments: [],
        students: [],
        student_assignments: [],
        scores: [],
        counter: 0,
        isLoading: true,
        isLoading2: true,
        isLoading3: true,
      }
    };

  componentWillMount = async () => {
    this.setState({ isLoading: true })
    const { params } = this.props.match

    await getStudents(params.class_name).then(students => {
      this.setState({
        students: students.data.data
      })
       this.setState({ isLoading3: false })
    })

    await getClassroomAssignments(params.class_name).then(assignments => {
      this.setState({
        assignments: assignments.data.data
      })
      this.setState({ isLoading2: false })
    })

    var scores = new Array(this.state.students.length);
    var y = 0;
    await this.state.students.forEach(async(student) => {
      await getStudentAssignments(student.username).then(assignments => {
        this.state.student_assignments[student.username] = assignments.data.data;
      })
      scores[y] = new Array(this.state.student_assignments[student.username].length);
      for(var i = 0; i < this.state.student_assignments[student.username].length; i ++) {
        scores[y][i] = this.state.student_assignments[student.username][i].assignment_score;
      } 
      y ++;
      this.setState({
        scores: scores
      })

      if(y == this.state.students.length) {
        this.setState({ isLoading: false })
      }
    })
  };

  getAssignmentNames = function(){
     return this.state.assignments.map((key, index)=>{
        return <th key={key.assignment_name}>{key.assignment_name}</th>
     })
  }

  getAssignmentScores = function(){
      var x = [];
      if(!this.state.scores[this.state.counter]) {
        return null
      } else {
        for(var y = 0; y < this.state.scores[this.state.counter].length; y ++) {
        x.push(<td>{this.state.scores[this.state.counter][y]}</td>)
      }
      this.state.counter = this.state.counter + 1
      return (x);
      }
      
  }

  createCardContentAssessments = function() {
    var x = []
    for(var y = 0; y < this.state.assignments.length; y ++) {
      var date = new Date(this.state.assignments[y].due_date);
      date = date.toLocaleDateString();
      x.push(<div class="card--content center-align hoverable waves-effect waves-light">
              <h6><b>{this.state.assignments[y].assignment_name}</b></h6><h6><b>Due Date: </b>{date}</h6></div>)
    }
    return (x);
  }


  render() {
    const { errors } = this.state;
    const { params } = this.props.match
    const { assignments } = this.state;
    const { students } = this.state;
    const { student_assignments } = this.state;
    const { scores } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s12">
            <Link to="/dashboardTeacher" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12 center-align">
              <h4>
                <b>Classroom:</b> {params.class_name}
              </h4>
            </div>
            <div className="col s12">
              <h4>
                Assignments Set
              </h4>
            </div>
            {this.state.isLoading2 ? <div> You have no assignments </div> : 
            <div className="col s12"> <section class="card">
                {this.createCardContentAssessments()}
              </section>
            </div>
            }
            <div className="col s12">
              <Link
                  to={'/' + params.class_name + '/assignments/setAssignment'}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Set Assignment
              </Link>
            </div>
          </div> 
        </div>
        <div style={{ marginTop: "4rem" }} className="row">
          
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                Students
              </h4>
              {this.state.isLoading3 || this.state.students.length == 0 ? <div> You have no students </div> : 
              <table className="striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    {this.isLoading ? null : this.getAssignmentNames()}
                    
                  </tr>
                </thead>
                <tbody>
                  {
                    students.map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {student.first_name}
                          </td>
                          <td>
                            {student.surname}
                          </td>
                          {this.state.isLoading ? null : this.getAssignmentScores()}
                          
                        </tr>
                      );
                    })
                  } 
                </tbody>
              </table>
            }
            </div>
          </div>
        
      </div>
    );
  }
}
ViewAssignments.propTypes = {
  getClassroomAssignments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { getClassroomAssignments }
)(ViewAssignments);