const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  }
  request(options, function(error, response, body) {
    body = JSON.parse(body);
    if(Array.isArray(body) === true) {
      body.forEach(function(repo) {
        db.save(repo);
      });
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;