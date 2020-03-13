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
      isLoading: true,
    }
  };

  getUsername = function(){
    return this.props.auth.user.username;
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.setState({
        username: null
    });
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue darken-3">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                paddingLeft: "20px",
              }}
              className="col s5 brand-logo white-text"
            >
              <i style={{paddingTop: "6px"}}><img src={logo} alt="Logo"/></i>
              CODIFY
            </Link>
           <div className="right">{this.getUsername()} {!this.getUsername() ? "" : 

            <Link
              to="/"
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
              onClick={this.onLogoutClick}
            >
              Log Out
            </Link>


           }
           </div>
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