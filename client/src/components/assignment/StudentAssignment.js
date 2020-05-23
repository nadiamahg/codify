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
      testCode: '',
      language: 'python3',
      output: false,
      testOutput: false,
      testResult: '',
      testArr: [],
      errors: {}
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTestSubmit = this.handleTestSubmit.bind(this);
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
        assignment_teacher_solution: assignment.data.data.assignment_teacher_solution,
        assignment_score: assignment.data.data.assignment_score,
        testCode: assignment.data.data.assignment_test_code,
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

  getTestCases = function(){
      var x = [];

      var score = 0;



      if(this.state.testArr.length === 0) {
        if(this.state.result.data.body.output === this.state.assignment_teacher_compiled_solution) {
          this.setState({
            assignment_score: "100/100"
          });
        }
        return null
      } else {
        var reg = /Test Passed(.)*/g
        for(var y = 0; y < this.state.testArr.length; y ++) {
            x.push(<div class="testCard--content waves-light">
              <h6><b>   {this.state.testArr[y]}</b></h6></div>)
            var str = this.state.testArr[y];
            if(reg.test(str)) {
              score = score + 1;
            }
        }

        if(this.state.result.data.body.output === this.state.assignment_teacher_compiled_solution) {
          score = score + 1;
        }
        console.log(score);

        score = score/(this.state.testArr.length + 1) * 100
        score = Math.round(score * 100) / 100
        score = score +  "/100";
        this.state.assignment_score = score;
    
        return (x);
      }
      
  }

  async handleTestSubmit(e) {
    e.preventDefault();
    let script = this.state.code + "\n" + this.state.testCode;
    let language = 'python3';
    let stdin = '';

    this.state.testResult = await axios.post('http://ec2-3-8-215-33.eu-west-2.compute.amazonaws.com:5000', {
      script,
      language,
      stdin
    });
    this.setState({
      testOutput: true
    });
    if(this.state.testOutput) {
      var res = this.state.testResult.data.body.output;
      var reg = /Test Passed(.)*|Test Failed(.)*/g
      var testArr = res.split("\n");
      var newArr = [];
     
      for(var x = 0; x<testArr.length; x ++) {
        var str = testArr[x];
        if(str.match(reg)) {
          newArr.push(str.match(reg))
        }
      }
      this.setState({
        testArr: newArr
      });

    }
    
  }

  async handleSubmit(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = 'python3';
    let stdin = '';

    this.state.result = await axios.post('http://ec2-3-8-215-33.eu-west-2.compute.amazonaws.com:5000', {
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
    if(this.state.result.data.body.output === this.state.assignment_teacher_compiled_solution) {
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
    const { params } = this.props.match;
    return (
      <div className="container">
        {!this.state.assignment_solution ? "" :
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s12">
            <Link to="/dashboardStudent" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12">
              <h4>
                Complete <b>{params.assignment_name}</b> below
              </h4>
              <p>Score: {this.state.assignment_score}</p>
            </div>
            <div className="input-field col s12">
              <form onSubmit={this.handleSubmit}>
                <div className="input-field col s6">
                  <CodeMirror
                  value={this.state.assignment_solution}
                  onChange={this.updateCode.bind(this)}
                  options={{lineNumbers: true, mode: 'python'}}
                  className="border"
                />
               
              </div>
                <button className="btn btn-outline-primary" style={{marginTop: "1rem"}}>Run</button>
                
                
                
              </form>
        
              <div className="input-field col s6" id="output">
              {this.state.output ? (
                <>
                  <hr /> 
                  <Output result={this.state.result} />
                </>
              ) : <div> Click run to view compiled code </div>}
              </div>
              </div>

              

              <form noValidate onSubmit={this.handleTestSubmit}>
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
              <section class="testCard col s6">
                      {!this.state.testOutput ? <div>Click run to run test cases</div> : this.getTestCases()}
                      

                    </section>
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