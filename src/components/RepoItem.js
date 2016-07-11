import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import CommitList from './CommitList';

function capitalize(word) {
  if (word.length <= 0) return;
  
  return `${word[0].toUpperCase()}${word.slice(1, word.length)}`; 
}

/*
  I've decided to implement the favorite repo UI with Cards. Never used
  material-ui but it's fun so far. Not sure what, if any, implications Cards have
  to the design but we'll see.

  Each repo is a Card, each commit is a ListItem in the CardText.
*/
export default function RepoItem({ name, description, commits, stargazers_count }) {
  // @TODO: set expanded to trigger by click. I think that React 15 broke many click
  // triggers in the material-ui package.
  return (
    <Card initiallyExpanded>
      <CardHeader
        title={`${capitalize(name)} (${stargazers_count} stars)`}
        subtitle={description}
        actAsExpander
      />
      <CardText
        expandable
        children={<CommitList commits={commits} />}
      />
    </Card>
  );
}

RepoItem.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  commits: React.PropTypes.array,
  stargazers_count: React.PropTypes.number
};
