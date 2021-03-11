import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';
import Snackbar from 'components/Snackbar';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const CausePage = lazy(() => import('./pages/CausePage'));

export const PATHS = {
  HOME: {
    route: '/',
    url: () => '/',
  },
  LOGIN: {
    route: '/login',
    url: () => '/login',
  },
  CAUSE: {
    route: '/cause/:causeId',
    url: (causeId: string) => `/cause/${causeId}`,
  },
};

const routes: FunctionComponent<{}> = () => (
  <>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={PATHS.HOME.route} component={Home} />
        <Route path={PATHS.LOGIN.route} component={Login} />
        <Route path={PATHS.CAUSE.route} component={CausePage}></Route>
      </Switch>
    </Suspense>
    <Snackbar />
  </>
);

export default routes;
