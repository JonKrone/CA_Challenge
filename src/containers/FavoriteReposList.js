import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import RepoItem from '../components/RepoItem';
import { clearRepos } from '../reducers/actions/userActions';

function FavoriteReposList({ repos, clearReposClick }) {
  return (
    <div>
      <h3>Favorited Repositories</h3>
      <div onClick={clearReposClick}>
        <FlatButton
          label="Clear favorites list"
        />
      </div>
      {
        repos.map((repo) => (
          <RepoItem
            {...repo}
            key={repo.id}
          />
        ))
      }
    </div>
  );
}

FavoriteReposList.propTypes = {
  repos: React.PropTypes.array,
  clearReposClick: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    clearReposClick() {
      dispatch(clearRepos());
    }
  };
}

function noop() = { return {}; }

export default connect(
  noop,
  mapDispatchToProps
)(FavoriteReposList);
