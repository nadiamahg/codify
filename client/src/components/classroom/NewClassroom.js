import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newClassroom } from "../../api/classroomApi";
import classnames from "classnames";

class NewClassroom extends Component {
  constructor() {
    super();
    this.state = {
      class_name: "",
      teacher_username: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      class_name: this.state.class_name,
      teacher_username: this.props.auth.user.username
    };
    this.props.newClassroom(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    this.props.history.push("/dashboard");
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Class</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.class_name}
                  error={errors.class_name}
                  id="class_name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.class_name || errors.classnamenotfound
                  })}
                />
                <label htmlFor="class_name">Class Name</label>
                <span className="red-text">
                  {errors.classnamenotfound}
                </span>
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
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
NewClassroom.propTypes = {
  newClassroom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps, { newClassroom }
)(NewClassroom);