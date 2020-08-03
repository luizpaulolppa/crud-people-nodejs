import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListUsers from '../pages/ListUsers';
import NewUser from '../pages/NewUser';
import ShowUser from '../pages/ShowUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ListUsers} />
    <Route path="/users/new" exact component={NewUser} />
    <Route path="/users/:id" exact component={ShowUser} />
  </Switch>
)

export default Routes;
