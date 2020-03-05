import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudentAssignment, submitAssignment } from "../../api/assignmentApi";
import classnames from "classnames";
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';
import Output from './Output';
import "./Assignment.css"

class StudentAssignment extends Component {

  constructor() {
    super();
    this.state = {
      assignment_name: "",
      assignment_question: "",
      assignment_solution: null,
      assignment_student_compiled_solution: "",
      student_username: "",
      assignment_score: "",
      _id: "",
      name: 'CodeMirror',
      result: '',
      code: '',
      language: 'python3',
      output: false,
      errors: {}
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    const { params } = this.props.match

    await getStudentAssignment(params.assignment_name).then(assignment => {
      this.setState({
        assignment_name: assignment.data.data.assignment_name,
        assignment_question: assignment.data.data.assignment_teacher_question,
        assignment_solution: assignment.data.data.assignment_student_solution,
        assignment_student_compiled_solution: assignment.data.data.assignment_student_compiled_solution,
        assignment_teacher_compiled_solution: assignment.data.data.assignment_teacher_compiled_solution,
        assignment_score: assignment.data.data.assignment_score,
        _id: assignment.data.data._id,
      })
    })
  };

  updateCode(newCode) {
    this.setState({
      code: newCode
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
      assignment_name: this.props.match.params.assignment_name,
      assignment_student_solution: this.state.code,
      assignment_student_compiled_solution: this.state.result.data.body.output,
      assignment_score: this.state.assignment_score,
      assignment_status: "submitted",
    };
    this.props.submitAssignment(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    this.props.history.push("/dashboardStudent");
  };

  onSave = e => {
    e.preventDefault();
    const userData = {
      assignment_name: this.props.match.params.assignment_name,
      assignment_student_solution: this.state.code,
      assignment_student_compiled_solution: this.state.result.data.body.output,
      assignment_score: this.state.assignment_score,
      assignment_status: this.state.assignment_status,
    };
    this.props.submitAssignment(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  onTest = e => {
    e.preventDefault();
    if(this.state.result.data.body.output == this.state.assignment_teacher_compiled_solution) {
      this.setState({
        assignment_score: "100/100"
      });
    }
    else {
      this.setState({
        assignment_score: "0/100"
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const { params } = this.props.match;
    var test = 'hi';
    return (
      <div className="container">
        {!this.state.assignment_solution ? "" :
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboardStudent" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                Complete <b>{params.assignment_name}</b> below
              </h4>
              <p>Score: {this.state.assignment_score}</p>
              
              <form onSubmit={this.handleSubmit}>
                <div className="input-field col s12">
                  <CodeMirror
                  value={this.state.assignment_solution}
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

              <p>Score: {this.state.assignment_score}</p>

              <form noValidate onSubmit={this.onTest}>
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
                  Test Assignment
                </button>
              </div>
              </form>

              <form noValidate onSubmit={this.onSave}>
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
                  Save Assignment
                </button>
              </div>
              </form>

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
                  Submit Assignment
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}
StudentAssignment.propTypes = {
  submitAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { submitAssignment }
)(StudentAssignment);