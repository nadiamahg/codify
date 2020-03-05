import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClassroomAssignments, getStudentAssignments } from "../../api/assignmentApi";
import { getStudents } from "../../api/classroomApi";
import classnames from "classnames";
import $ from 'jquery';



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
      }
    };

  componentWillMount = async () => {
    this.setState({ isLoading: true })
    const { params } = this.props.match
    console.log("test1");
    await getClassroomAssignments(params.class_name).then(assignments => {
      console.log("test2");
      this.setState({
        assignments: assignments.data.data
      })
      console.log("test3");
    })

    await getStudents(params.class_name).then(students => {
      console.log("test4");
      this.setState({
        students: students.data.data
      })
      console.log("test5");
    })

    var scores = new Array(this.state.students.length);
    var y = 0;
    await this.state.students.forEach(async(student) => {
      console.log("test6");
      await getStudentAssignments(student.username).then(assignments => {
        console.log("test7");
        this.state.student_assignments[student.username] = assignments.data.data;
      })
      console.log("test8");
      scores[y] = new Array(this.state.student_assignments[student.username].length);
      for(var i = 0; i < this.state.student_assignments[student.username].length; i ++) {
        console.log("test9");
        scores[y][i] = this.state.student_assignments[student.username][i].assignment_score;
      } 
      y ++;
      console.log("test10");
      this.setState({
        scores: scores
      })

      if(y == this.state.students.length) {
        this.setState({ isLoading: false })
        console.log("test16")
      }
      console.log("test12");
    })

    
    console.log("test11");

  };

  getAssignmentNames = function(){
     return this.state.assignments.map((key, index)=>{
        return <th key={key.assignment_name}>{key.assignment_name}</th>
     })
  }

  getAssignmentScores = function(){
    var x = []
    for(var y = 0; y < this.state.scores[this.state.counter].length; y ++) {
      x.push(<td>{this.state.scores[this.state.counter][y]}</td>)
    }
    this.state.counter = this.state.counter + 1
    return (x);
     
  }


  render() {
    const { errors } = this.state;
    const { params } = this.props.match
    const { assignments } = this.state;
    const { students } = this.state;
    const { student_assignments } = this.state;
    const { scores } = this.state;
    return (this.state.isLoading) ? <div>Loading</div> : (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboardTeacher" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>View {params.class_name} Assignments</b> below
              </h4>
              <table className="striped">
                <thead>
                  <tr>
                    <th>Assignment Name</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    assignments.map((assignment, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {assignment.assignment_name}
                          </td>
                          <td>
                            {assignment.due_date}
                          </td>
                        </tr>
                      );
                    })
                  } 
                </tbody>
              </table>
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
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>View {params.class_name} Students</b> below
              </h4>
              <table className="striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    {this.getAssignmentNames()}
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
                          {this.getAssignmentScores()}
                        </tr>
                      );
                    })
                  } 
                </tbody>
              </table>
            </div>
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