import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginComponent from "../../src/Component/LoginComponent/Login";
import Registration from "../../src/Component/Registration/Registration";
import ForgotPassword from "../Component/ForgotPassword/ForgotPassword";
import  HeaderComponent  from "../Component/Header/Header";
import Dashboard from "../Component/Dashboard/Dashboard";
import PrivateRoute from "../Container/privateRoute";
import { handleSimpleApiError, handleSimpleApiSuccess } from "../Utils/api";
import axios from "axios";
import "antd/dist/antd.css";
import "./App.scss";

/***
 * This is the interceptor for handle API error and will show error notification
 * ** */
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return handleSimpleApiError({
      errors: [{ response: error }],
    });
  }
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" restricted={false} component={LoginComponent} exact />
          <Route
            path="/register"
            restricted={false}
            component={Registration}
            exact
          />
          <Route path="/forgot-password" restricted={false} component={ForgotPassword} exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route path="/header" component={HeaderComponent} />
          <Route path="*" component={()=><h1 className="page-404">404 page not found</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
