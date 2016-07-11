import React from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import moment from 'moment';
import { Link } from 'react-router';

/*
  A commit listing consists of a avatar, description, time, and author and when clicked,
  directs us to the Author page. Alternatively, a comment box click could direct us to
  to the github page for the commit and an avatar or username click could Link us to
  the author's page in this app.

  @TODO stargazers
*/
export default function CommitItem({ author, message, date, author_avatar,
  author_login, html_url }) {
  const trimmedMessage = message.length > 100 ? `${message.slice(0, 100)}...` : message;

  return (
    <div>
      <Divider />
      <Link to={`/author/${author_login}`} >
        <ListItem
          key={html_url}
          primaryText={trimmedMessage}
          secondaryText={`${author}, ${moment(date).fromNow()}`}
          leftAvatar={<Avatar src={author_avatar} />}
        />
      </Link>
    </div>
  );
}

CommitItem.propTypes = {
  author: React.PropTypes.string,
  message: React.PropTypes.string,
  date: React.PropTypes.string,
  author_avatar: React.PropTypes.string,
  author_login: React.PropTypes.string,
  html_url: React.PropTypes.string
};
