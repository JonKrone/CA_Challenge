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

/* eslint-disable arrow-body-style */
export default connect(
  () => {return {};},
  mapDispatchToProps
)(FavoriteReposList);
/* eslint-enable arrow-body-style */
