import React from 'react';
import moment from 'moment';

import { Card, CardHeader, CardText, CardTitle, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

export default function Author({ name, avatar_url, bio, blog, followers,
  created_at, login, html_url }) {
  const joined = `joined Github ${moment(created_at).fromNow()}`;

  return (
    <Card expanded>
      <CardHeader
        avatar={<Avatar src={avatar_url} size={140} />}
      />
      <CardTitle
        title={`${name} (${login}) ${joined}`}
        subtitle={`${followers} followers`}
      />
      <CardText>{bio || 'No bio provided'}</CardText>
      <CardActions>
        <RaisedButton
          label={blog ? 'Personal Blog' : 'No personal blog'}
          linkButton
          href={blog}
        />
        <RaisedButton
          label='Github Profile'
          linkButton
          href={html_url}
          icon={<FontIcon className='muidocs-icon-custom-github' />}
        />
      </CardActions>
    </Card>
  );
}

Author.propTypes = {
  name: React.PropTypes.string,
  bio: React.PropTypes.string,
  blog: React.PropTypes.string,
  followers: React.PropTypes.number,
  created_at: React.PropTypes.string,
  login: React.PropTypes.string,
  html_url: React.PropTypes.string,
  avatar_url: React.PropTypes.string
};
