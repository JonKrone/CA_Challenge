import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

/*
  I had not been able to come up with a useful custom redux 'store enhancer'
  but I think there might be a use case for synchronizing post-reduction state
  with localstore after every action:

  After each action is processed, selected parts of the subsequent state
  could be stored however we saw fit. I would love to try it!
*/
export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      createLogger(),
      thunkMiddleware
    )
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
