import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import {Header} from 'components';

const Home = lazy(() => import('pages/home'));
const Room = lazy(() => import('pages/room'));

const Routes = () => (
  <Switch>
    <Suspense fallback={<Header>Loading Page...</Header>}>
      <Route path="/room/:roomId" component={Room} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
);

export default Routes;
