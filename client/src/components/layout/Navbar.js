import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import Dashboard from '../dashboard/Dashboard'

const Navbar = (props) => {
  const { isloading, isAuthenticated, logoutAction } = props;
  const guestView = () => {
    return (
      <Fragment>
        <ul>
          <li>
            <Link to="/home">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </Fragment>
    );
  };

  const userView = () => {
    return (
      <Fragment>
        <ul>
          <li>
            <Link to="/dashboard" >
              <i class="fa fa-user" aria-hidden="true"></i>
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={logoutAction}>
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              <span className="hide-sm">Logout</span>
            </Link>
          </li>
        </ul>
      </Fragment>
    );
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-sign-out-alt"></i> DevConnector
        </a>
      </h1>
      {!isloading && !isAuthenticated ? guestView() : userView()}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.User.isAuthenticated,
    isloading: state.User.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutAction: (Link) => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
