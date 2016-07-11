import React, { Component } from 'react';
import { connect } from 'react-redux';

import Author from '../components/Author';
import { fetchUserByLogin } from '../reducers/actions/userActions';

class AuthorPage extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.routeParams.author_login);
  }

  render() {
    return (
      <div>
        {
          this.props.author
            ? <Author {...this.props.author} />
            : (<div>
              <h1>The author page is loading.</h1>
            </div>)
        }
      </div>
    );
  }
}

// Fails lint because it is defined outside of the class definition.
AuthorPage.propTypes = {
  author: React.PropTypes.shape({
    name: React.PropTypes.string,
    bio: React.PropTypes.string,
    blog: React.PropTypes.string,
    followers: React.PropTypes.number,
    created_at: React.PropTypes.string,
    login: React.PropTypes.string,
    html_url: React.PropTypes.string,
    avatar_url: React.PropTypes.string
  }),
  routeParams: React.PropTypes.shape({
    author_login: React.PropTypes.string
  }),
  fetchUser: React.PropTypes.func
};

// With GQL+Apollo: mapQueriesToProps
function mapStateToProps(state) {
  return {
    author: state.author
  };
}

// With GQL+Apollo: mapMutationsToProps
function mapDispatchToProps(dispatch) {
  return {
    fetchUser(author_login) {
      dispatch(fetchUserByLogin(author_login));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
