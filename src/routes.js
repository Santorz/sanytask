import React from 'react';
import { Route, Switch } from 'react-router';

export default function MyRouter() {
  return (
    <Switch>
      <Route exact path='/' />

      {/* Route path for dashboard*/}
      <Route path='/dashboard' />

      {/* end of dashboard route path */}

      {/* Route Path for login */}
      <Route path='/login' />

      {/* end of login route path */}

      {/* Route path for signup page*/}
      <Route path='/signup' />
      {/* end of signup route path */}

      <Route path='*' />
    </Switch>
  );
}
