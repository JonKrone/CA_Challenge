/* eslint-disable no-use-before-define */
// Disable because of readability. Should a file like this be linted with such?

/*
  This file could be considered a model and will be the preferred
  place for operations that need to touch repository data.

  These are likely a prime examples of where GQL provides value.
  The Github API and our data requirements are inevitably going to change so
  describing the data and the shape we need it in may be a more flexible
  implementation than hardcoding requests and information extraction.
*/
import fetch from 'isomorphic-fetch';
import R from 'ramda';
import { API, json, headers } from './helpers';

/*
  This function retrieves a whole bunch of information about an organizations
  repo, pares it down, retrieves additional information, then gets resolves.

  The initial fetch results in a large blob of information and is a wonderful
  example of where GQL could prevent the fetching of 95% of the data.

  @param repoName<string> is of the form `organization/repository`
*/
export function fetchRepoByName(repoName) {
  const [org, repo] = repoName.split('/');

  const endpoint = `${API}/repos/${org}/${repo}`;

  return fetch(endpoint, { headers })
    .then(json)
    .then(pluckRepoData);
}

/*
  Most fetching and manipulation is organized here and the helpers below
  break functionality down into more reasonable chunks.

  @param repoData<Object>: The whole chunk of data from Github related to this repo.
    A wonderful example of where GQL could prevent the fetching of 95% of the data.

  @return: {
    name
    description
    (would be fun to list top collaborators)
    stargazers_count
    commits: [{
      author
      message
      date
      comment_count (for a right-side icon)
      author_avatar
      author_id
      html_url
    }]
  }
*/
function pluckRepoData(repoData) {
  // console.warn('GITHUB repo data:', repoData);
  const repoItem = {
    id: repoData.id,
    name: repoData.name,
    organization: repoData.organization.login,
    description: repoData.description,
    stargazers_count: repoData.stargazers_count
  };

  const commitUrl = repoData.commits_url.replace(/{\/sha}/, '');
  return fetchCommitByUrl(commitUrl)
    .then(pluckRecentCommits)
    .then(commits => {
      repoItem.commits = commits;

      return repoItem;
    });
}

// @return A list of the most recent commits to a repo.
function fetchCommitByUrl(commit_url) {
  return fetch(commit_url, { headers })
    .then(json);
}

// @return The three most recent commits
function pluckRecentCommits(commitList) {
  // console.warn('GITHUB commits data:', commitData);
  return R.take(3, commitList)
    .map(pluckCommitInfo);
}

// @return An Object of particular data selected from a commit
function pluckCommitInfo(info) {
  return {
    author: info.commit.author.name,
    message: info.commit.message,
    date: info.commit.author.date,
    comment_count: info.commit.comment_count,
    author_avatar: info.author.avatar_url,
    // author_id: info.author.id, // replaced with author_login
    author_login: info.author.login,
    html_url: info.html_url
  };
}

// for searching github repos to favorite
// https://api.github.com/search/repositories?q={query}
