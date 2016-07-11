/*
  A revision to state structure initially leads me to something like:

  root {
    author: {
      ...info
    }
    repos: {
      favorites: [
        {
          ...info
        }
      ]
    }
  }
*/

// Used to dynamically load favorites from a local persistent store,
// allowing us to maintain data between sessions/refreshes/windows.
function loadFavorites() {
  // console.log('local storage:', localStorage.getItem('favoriteRepos'))
  const favs = JSON.parse(localStorage.getItem('favoriteRepos'));
  const ramda = [
    {
      name: '(Seeded) Ramda',
      description: ':ram: Practical functional Javascript',
      stargazers_count: 4931,
      commits: [
        {
          author: 'Marc Balaban',
          author_avatar: 'https://avatars.githubusercontent.com/u/2932405?v=3',
          author_login: 'MarcBalaban',
          comment_count: 0,
          date: '2016-06-29T19:17:23Z',
          html_url: 'https://github.com/ramda/ramda/commit/40d366515808fcc6c0bc8d1eaf9adf5840777925',
          message: 'Update LICENSE.txt (#1814)'
        }
      ]
    }
  ];

  return favs || ramda;
}

export default {
  favoriteRepos: loadFavorites()
};
