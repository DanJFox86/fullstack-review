import React from 'react';

const Repo = (props) => {
    let id = props.repo.id;
    let name = props.repo.name;
    let repoUrl = props.repo.url;
    let description = props.repo.description;
    let forksCount = props.repo.forks_count;
    let watchers_count = props.repo.watchers_count;
    let ownerLogin = props.repo.ownerLogin;
    let ownerUrl = props.repo.ownerUrl;
    let avatar_url = props.repo.avatar_url;

    return (
      <div id={id}>
      <h3><a href={repoUrl}>{name}</a> </h3>
        <div className="ownerName" 
                  href={ownerUrl}>{ownerLogin}       <em>forks: {forksCount}</em>
        </div>
        <dd className="description">{description}</dd>
        <img className="avatar"
                   src={avatar_url}/>
      </div>
    )
}

export default Repo;