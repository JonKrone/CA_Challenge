import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';

import HomePage from './pages/Home';
import AuthorPage from './pages/Author';


/**
 * Declare your routes here using the `<Route />` component
 * from react-router. And example /counter route is provided.
 * Please make sure to remove it prior to submission.
 *
 * You may see some warnings in the console like:
 *
 *     "You cannot change <Router routes>; it will be ignored"
 *
 * You can just ignore those, it's a side affect of hot reloading
 * with react-router. You may also see warnings logged by React about
 * unknown props. Such as:
 *
 *    "Warning: Unknown prop `noGutter` on <div> tag"
 *
 * You can also ignore those; this warning was introduced in React 15.2
 * and the UI library used here (material-ui) has not been updated to
 * address these warnings yet. Just make sure that you do not cause any
 * additional instances of these warnings.
 */

export default function App() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={HomePage} />
        <Route path='author/:author_login' component={AuthorPage} />
      </Route>
    </Router>
  );
}
