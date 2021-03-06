import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from 'components';

const Home = lazy(() => import('pages/home'));
const Room = lazy(() => import('pages/room'));
const Login = lazy(() => import('pages/login'));
const Profile = lazy(() => import('pages/profile'));
const RoomList = lazy(() => import('pages/room-list'));
const HowToPlay = lazy(() => import('pages/how-to-play'));

const Routes = () => (
  <Switch>
    <Suspense fallback={<Header>Loading Page...</Header>}>
      <Route path="/room/:roomId" component={Room} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/roomList" component={RoomList} />
      <Route exact path="/howToPlay" component={HowToPlay} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Route exact path="/" component={Home} />
    </Suspense>
  </Switch>
);

export default Routes;
