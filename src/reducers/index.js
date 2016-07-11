/*
  Currently, the state tree is a little flat and would change a little
  on a second iteration. Also, this is a reducer with too many concerns
  and should probably just be something like:

    export combineReducers(author<Reducer>, repos<Reducer>)
*/
import initialState from './initialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_REPOS':
      return clearRepos(state);
    case 'ADD_FAVORITE':
      return addFavorite(state, action);
    case 'FETCH_USER_SUCCESS':
      return receiveUserInfo(state, action);
    case 'FAVORITING_REPO':
    case 'FAVORITING_ERROR':
    case 'FETCHING_USER':
    case 'FETCH_USER_ERROR':
      return state; // in-progress and error states are not represented yet.
  }

  console.warn('Unhandled reduction:', action);
  return state;
}

function addFavorite(state, { payload }) {
  /* eslint-disable */
  const newState = {
    ...state,
    favoriteRepos: [...state.favoriteRepos, payload]
  };
  /* eslint-enable */

  localStorage.setItem('favoriteRepos', JSON.stringify(newState.favoriteRepos));

  return newState;
}

function receiveUserInfo(state, { payload }) {
  /* eslint-disable */
  return {
    ...state,
    author: payload
  }
  /* eslint-enable */
}

function clearRepos(state) {
  localStorage.removeItem('favoriteRepos');
  
  /* eslint-disable */
  return {
    ...state,
    favoriteRepos: [],
  }
  /* eslint-enable */
}