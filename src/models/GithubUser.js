import fetch from 'isomorphic-fetch';

import { API, json, headers } from './helpers';
import { pick } from 'ramda';

/*
  Fetch information regarding the user with account name: @param userLogin
  and select properties listed by @var properties.

  There is really so much interesting information that we could extract
  from here: Most starred repos, most active repos, most debated commits,
  etc..

 @return {
    ...properties listed in @variable properties
  }
*/
export function fetchGithubUserByLogin(userLogin) {
  const endpoint = `${API}/users/${userLogin}`;
  const properties = ['name', 'login', 'avatar_url', 'bio',
    'followers', 'created_at', 'blog', 'html_url'];

  return fetch(endpoint, { headers })
    .then(json)
    .then(pick(properties));
}
