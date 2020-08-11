import React, { Fragment,useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Navbar  from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import  Register  from "./components/auth/Register";
import  Login  from "./components/auth/Login";

import { Provider } from "react-redux";
import store from "./redux/store";
import AlertComponent from "./components/AlertComponent";
import { loadUser } from "./redux/service/auth.service";
import { setAuthToken } from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {

  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    console.log(localStorage.getItem('token'),"== Here frm App",localStorage.token)
      store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path="/" component={Landing} />
          <section className="container">
          <AlertComponent />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute component={Dashboard} path='/dashboard' exact />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
