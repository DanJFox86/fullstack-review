import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {

    let repos = props.repos.map(function(repo) {
      return <Repo repo={repo}/>;
    });
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {props.repos.length} repos.
        {repos}
      </div>
    )
}

export default RepoList;