import React, { Component } from "react";
import { Link } from "react-router-dom";
class RegisterTeacher extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      surname: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      first_name: this.state.first_name,
      surname: this.state.surname,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
console.log(newUser);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register as teacher</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login_teacher">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.first_name}
                  error={errors.first_name}
                  id="first_name"
                  type="text"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.surname}
                  error={errors.surname}
                  id="surname"
                  type="text"
                />
                <label htmlFor="surname">Surname</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
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
                  Sign up as Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterTeacher;