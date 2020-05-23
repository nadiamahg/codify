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

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }


  updateTestCode(newCode) {
    this.setState({
      testCode: newCode
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

  getTestCases = function(){
      var x = [];
      if(this.state.testArr.length === 0) {
        return null
      } else {
        for(var y = 0; y < this.state.testArr.length; y ++) {
            x.push(<div class="testCard--content waves-light">
              <h6><b>   {this.state.testArr[y]}</b></h6></div>)
        }
    
        return (x);
      }
      
  }

  async handleSubmit(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = 'python3';
    let stdin = '';

    this.state.result = await axios.post('http://ec2-3-8-215-33.eu-west-2.compute.amazonaws.com', {
      script,
      language,
      stdin
    });
    this.setState({
      output: true
    });
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

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      assignment_name: this.state.assignment_name,
      assignment_question: this.state.assignment_question,
      assignment_solution: this.state.code,
      assignment_compiled_solution: this.state.result.data.body.output,
      teacher_username: this.props.auth.user.username,
      assignment_test_code: this.state.testCode,
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
          <div className="col s12">
            <Link to="/dashboardTeacher" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>New Assignment</b>
              </h4>
            </div>

              
              
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
                  <label htmlFor="assignment_name">Assignment Name</label>
                  <span className="red-text">
                    {errors.classnamenotfound}
                  </span>
                  <br></br>
                  <h6 style={{ marginTop: "2rem" }}><b>Assignment Question & Template Code</b></h6>
                  
                  <CodeMirror
                  value={'# Enter your question and template code here'}
                  id="assignment_name"
                  onChange={this.updateQuestion.bind(this)}
                  options={{lineNumbers: true, mode: 'python'}}
                  className="assignment_question"
                />
                </div>

                <div className="col s12">
                  <h6 style={{ marginTop: "2rem" }}><b>Assignment Solution</b></h6>
                  <form onSubmit={this.handleSubmit}>
                    <div className="col s6">
                      <CodeMirror
                      value={this.state.code}
                      onChange={this.updateCode.bind(this)}
                      options={{lineNumbers: true, mode: 'python'}}
                      className="border"
                    />
                    </div>
                    <button className="btn btn-outline-primary">Run</button>
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

                 <div className="col s12">
                  <h6 style={{ marginTop: "2rem" }}><b>Assignment Test Cases</b></h6>
                  <form onSubmit={this.handleTestSubmit}>
                    <div className="col s6">
                      <CodeMirror
                      value={this.state.testCode}
                      onChange={this.updateTestCode.bind(this)}
                      options={{lineNumbers: true, mode: 'python'}}
                      className="border"
                    />
                    </div>
                    <button className="btn btn-outline-primary">Run</button>
                  </form>
                  

                  <section class="testCard col s6">
                      {!this.state.testOutput ? <div>Click run to run test cases</div> : this.getTestCases()}
                      

                    </section>

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
