import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import FavoriteReposList from '../containers/FavoriteReposList';
import { submitFavorite } from '../reducers/actions/userActions';

function HomePage(props) {
  return (
    <div>
      <div>
        <h1>A hub for your favorite Github repos</h1>
        <hr />
      </div>

      <TextField
        floatingLabelText="organization/repo"
        onKeyDown={props.favoriteRepo}
      />

      <FavoriteReposList repos={props.favoriteRepos} />
    </div>
  );
}

HomePage.propTypes = {
  favoriteRepos: React.PropTypes.array,
  favoriteRepo: React.PropTypes.func
};

// With GQL+Apollo, this would be mapQueriesToProps
function mapStateToProps(state) {
  return {
    favoriteRepos: state.favoriteRepos
  };
}

function isEnterKey(event) {return event.keyCode === 13;}

// With GQL+Apollo, this would be mapMutationsToProps
function mapDispatchToProps(dispatch) {
  return {
    favoriteRepo(e) {
      if (!isEnterKey(e)) return;

      const repoName = e.target.value;

      // currently does not reactively add an empty RepoItem but should for a responsive uI
      dispatch(submitFavorite(repoName));
    }
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
