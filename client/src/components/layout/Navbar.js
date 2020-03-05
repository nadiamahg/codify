import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        username: this.props.auth.user.username
      });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue darken-3">
            <Link
              to="/dashboardTeacher"
              style={{
                fontFamily: "monospace",
                paddingLeft: "20px",
              }}
              className="col s5 brand-logo white-text"
            >
              <i style={{paddingTop: "6px"}}><img src={logo} alt="Logo"/></i>
              CODIFY
            </Link>
           {this.state.username ? <div class="right">{this.state.username} <button
              onClick={this.onLogoutClick}
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
            >
            Log Out
            </button></div> : null}
          </div>
        </nav>
      </div>
    );
  }

}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps, { logoutUser })(Navbar);