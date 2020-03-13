import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAssignment } from "../../api/assignmentApi";
import classnames from "classnames";
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';
import "./Assignment.css"

class ViewAssignment extends Component {

  constructor() {
    super();
    this.state = {
      assignment_question: "",
      assignment_solution: "",
      assignment_compiled_solution: "",
      name: 'CodeMirror',
      isLoading: true,
    }; 
  }

  componentDidMount = async () => {
      const { params } = this.props.match
      var str = encodeURI(params.assignment_name);
      await getAssignment(str).then(assignment => {
        this.setState({
          assignment_question: assignment.data.data.assignment_question,
          assignment_solution: assignment.data.data.assignment_solution,
          assignment_compiled_solution: assignment.data.data.assignment_compiled_solution,
        })
        this.setState({isLoading: false})
      })
  };

  render() {
    const { params } = this.props.match
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
                <b>Assignment</b> {params.assignment_name}
              </h4>
              
             
                <div className="input-field col s12">
                  <CodeMirror
                  value={this.state.assignment_question}
                  id="assignment_name"
                  options={{lineNumbers: true, mode: 'python', readOnly: true}}
                  className="assignment_question"
                />
                <br />
                  <CodeMirror
                  value={this.state.assignment_solution}
                  id="assignment_name"
                  options={{lineNumbers: true, mode: 'python', readOnly: true}}
                  className="assignment_question"
                />
                
                </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ViewAssignment.propTypes = {
  getAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { getAssignment }
)(ViewAssignment);