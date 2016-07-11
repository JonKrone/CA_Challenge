import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CommitItem from './CommitItem.js';

// Commit items should have a more unique key. The SHA hash would be perfect.
export default function CommitList({ commits }) {
  return (
    <List>
      <Subheader>Recent Commits</Subheader>
      {
        commits.length > 0
          ? commits.map((commit) => (
            <CommitItem
              key={commit.date}
              {...commit}
            />
          ))
          : <div className="no-commits" />
      }
    </List>
  );
}

CommitList.propTypes = {
  commits: React.PropTypes.array
};
