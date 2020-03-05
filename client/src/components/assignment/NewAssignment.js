import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAssignment } from "../../api/assignmentApi";
import classnames from "classnames";
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';
import Output from './Output';
import "./Assignment.css"

class NewAssignment extends Component {

  constructor() {
    super();
    this.state = {
      assignment_name: "",
      assignment_question: "",
      assignment_solution: "",
      assignment_compiled_solution: "",
      teacher_username: "",
      name: 'CodeMirror',
      result: '',
      code: '',
      language: 'python3',
      output: false,
      errors: {}
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  updateQuestion(newCode) {
    this.setState({
      assignment_question: newCode
    });
  }

  getData(lang) {
    this.setState({
      language: lang
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = 'python3';
    let stdin = '';

    this.state.result = await axios.post('http://localhost:5000', {
      script,
      language,
      stdin
    });
    this.setState({
      output: true
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      assignment_name: this.state.assignment_name,
      assignment_question: this.state.assignment_question,
      assignment_solution: this.state.code,
      assignment_compiled_solution: this.state.result.data.body.output,
      teacher_username: this.props.auth.user.username
    };
    this.props.newAssignment(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    this.props.history.push("/dashboardTeacher");
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value });
  };

  render() {
    const { errors } = this.state;
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
                <b>Add Assignment</b> below
              </h4>
              
              <form onSubmit={this.handleSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.assignment_name}
                    error={errors.assignment_name}
                    id="assignment_name"
                    type="text"
                    className={classnames("assignment_name", {
                      invalid: errors.assignment_name || errors.classnamenotfound
                    })}
                  />
                  <label htmlFor="assignment_name">assignment_name</label>
                  <span className="red-text">
                    {errors.classnamenotfound}
                  </span>
                  <CodeMirror
                  value={'# Enter your question and template code here'}
                  id="assignment_name"
                  onChange={this.updateQuestion.bind(this)}
                  options={{lineNumbers: true, mode: 'python'}}
                  className="assignment_question"
                />
                <br />
                  <CodeMirror
                  value={this.state.code}
                  onChange={this.updateCode.bind(this)}
                  options={{lineNumbers: true, mode: 'python'}}
                  className="border"
                />
                <br />
                <button className="btn btn-outline-primary">Run</button>
                </div>
                <br />
                
              </form>
        
              <div className="input-field col s12" id="output">
              {this.state.output ? (
                <>
                  <hr /> 
                  <Output result={this.state.result} />
                </>
              ) : <div> Click run to view compiled code </div>}
              </div>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12" style={{ paddingLeft: "11.250px" }}>
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
                  Add Assignment
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
NewAssignment.propTypes = {
  newAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { newAssignment }
)(NewAssignment);