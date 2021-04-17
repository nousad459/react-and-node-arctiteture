import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
import { checkCookie } from '../Utils/cookies';


/***
   * This is private route, it will check token, If token is found in cookie, it will redirect on dashboard.
   * ** */
const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route { ...rest } render={props => (
    checkCookie() !== null ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;