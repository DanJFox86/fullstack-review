const express = require('express');
const bodyParser = require('body-parser');
const gh = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log(`${req.method} request received from ${req.url}`);
  if (typeof req.body.data !== 'string') {
    res.send('Expected a string but got something else, try again.');
  } else {
    if (req.body.data !== req.body.data.replace(/[^A-Za-z0-9_]+/g, '')) {
      res.send('Naughty hobbitses');
    } else {
      gh.getReposByUsername(req.body.data); 
      // Need to refactor res.send to a callback, only called after data has been processed into mongoDB
      res.send('message received');
    }
  }
});
app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(`${req.method} request received from ${req.url}`);
  db.top25(function(docs) {
    console.log(`Retrieved ${docs.length} from the database`)
    res.send(docs);
  });

});

// let port = process.env.PORT || 1128;
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

