/* eslint-disable no-use-before-define */
// Disable because of readability. Should a file like this be linted with such?

import { fetchRepoByName } from '../../models/GithubRepo';
import { fetchGithubUserByLogin } from '../../models/GithubUser';

// With additional time, I would curry actions used in our thunks to streamline the code.
export function submitFavorite(repoName) {
  return (dispatch) => {
    dispatch(favoritingRepo(repoName));

    fetchRepoByName(repoName)
      .then(data => dispatch(addFavorite(data)))
      .catch(error => dispatch(favoritingError(error)));
  };
}

export function fetchUserByLogin(user_login) {
  return (dispatch) => {
    dispatch(fetchingUser(user_login));

    fetchGithubUserByLogin(user_login)
      .then(data => dispatch(fetchUserSuccess(data)))
      .catch(error => dispatch(fetchUserError(error)));
  };
}

export function clearRepos() {
  return { type: 'CLEAR_REPOS', payload: null };
}

function favoritingRepo(repoName) {
  return { type: 'FAVORITING_REPO', payload: repoName };
}

function addFavorite(repoData) {
  return { type: 'ADD_FAVORITE', payload: repoData };
}

function favoritingError(error) {
  console.error('Whoops! Mistake fetching repo info!', error);
  return { type: 'FAVORITING_ERROR', payload: error };
}

function fetchUserSuccess(userData) {
  return { type: 'FETCH_USER_SUCCESS', payload: userData };
}

function fetchingUser(user_login) {
  return { type: 'FETCHING_USER', payload: user_login };
}

function fetchUserError(error) {
  console.error('Whoops! Mistake fetching author info!', error);
  return { type: 'FETCH_USER_ERROR', payload: error };
}
