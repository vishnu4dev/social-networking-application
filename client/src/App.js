import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import  Register  from "./components/auth/Register";
import { Login } from "./components/auth/Login";

import { Provider } from "react-redux";
import store from "./redux/store";
import AlertComponent from "./components/AlertComponent";

const App = () => {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
