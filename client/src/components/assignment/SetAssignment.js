import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAssignment, getAssignments } from "../../api/assignmentApi";
import { getClassroom } from "../../api/classroomApi";
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Materialize from 'materialize-css'

class SetAssignment extends Component {

  constructor() {
    super();
    this.state = {
      assignment_name: "",
      class_name: "",
      due_date: "",
      due_time:"",
      assignments: [],
      date_instance:"",
      select_instance: "",
      class_code: "",
    }; 
  }
  componentDidMount = async () => {
      this.setState({ isLoading: true })
      const { params } = this.props.match;
      var elems = document.querySelectorAll('.datepicker');
      this.state.date_instance = Materialize.Datepicker.init(elems, {format:'yyyy-mm-dd' });

      var elemsSelect = document.querySelectorAll('select');
      this.state.select_instance = Materialize.FormSelect.init(elemsSelect, {});
      

      await getAssignments(this.props.auth.user.username).then(assignments => {
        this.setState({
          assignments: assignments.data.data
        })
      })

      await getClassroom(this.props.match.params.class_name).then(classroom => {
        this.setState({
          class_code: classroom.data.data.class_code
        })
      })

  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();
      const userData = {
        class_name: this.props.match.params.class_name,
        assignment_name: this.state.select_instance[0].el.value,
        due_date: this.state.date_instance[0].date.toISOString(),
        assignment_student_solution: "",
        assignment_student_compiled_solution: "",
        assignment_status: "not submitted",
        class_code: this.state.class_code,

      };
      this.props.setAssignment(userData);
      this.props.history.push("/dashboardTeacher");
  };
  

  render() {
    const { errors } = this.state;
    const { params } = this.props.match;
    const { assignments } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboardTeacher" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Set Assignment</b> below
                <p>Class Name: {params.class_name}</p>
              </h4>
            </div>
              
            <form noValidate onSubmit={this.onSubmit}>
              
  <div className="input-field col s12">
  <select className="browser-default">
    <option value="" disabled selected>Choose the assignment</option>
    {
                    assignments.map((assignment, i) => {
                      return (
                          <option key ={i} value={assignment.assignment_name}>{assignment.assignment_name}</option>
                      );
                    })
                  } 
  </select>
  <div className="input-field col s12">
    <input id="due_date" type="text" onChange={this.onChange} value={this.state.due_date} className="datepicker"/>
    <label htmlFor="due_date">Date Due</label>
    </div>
    
   
</div>
              
              

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Set Assignment
                </button>
              </div>
            </form> 
          </div>
        </div>
      </div>
    );
  }
}
SetAssignment.propTypes = {
  setAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { setAssignment }
)(SetAssignment);