/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, isloaded, ...rest }) => (
<Route
    {...rest}
    render={props =>
      !auth && !isloaded? 
      <Redirect to="/login" />
      :
      <Component {...props} />
    }
  />)

const mapStateToProps = (state) => ({
  auth: state.User.isAuthenticated,
  isloaded: state.User.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
