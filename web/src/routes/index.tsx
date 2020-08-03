import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListUsers from '../pages/ListUsers';
import NewUser from '../pages/NewUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ListUsers} />
    <Route path="/new-user" exact component={NewUser} />
  </Switch>
)

export default Routes;
