import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import initialState from '../reducers/initialState';
import configureStore from '../store/configureStore';

const store = configureStore(initialState);

/**
 * The provided Redux store uses the `redux-logger` middleware.
 * If you open your browser console you should see a console
 * group containing the state and action details.
 *
 * redux-devtools is not provided. If you wish to use it, feel free
 * to implement it, but it is not required.
 */

export default function Layout({ children }) {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <div>
          <Toolbar>
            <ToolbarTitle text="Github Favorites" />
          </Toolbar>
          {children}
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node
};
