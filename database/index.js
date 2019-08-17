const mongoose = require('mongoose');

const herokuMongoUri = 'mongodb://heroku_fm1933fs:9lhbsnq2f4jlfu6qqs865lociv@ds263927.mlab.com:63927/heroku_fm1933fs';

// mongoose.connect('mongodb://localhost/repos', { useNewUrlParser: true });
mongoose.connect(herokuMongoUri, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/fetcher', function(err) {
//   console.log(`error triggered: `, !!err);
// });
// var promise = mongoose.createConnection('mongodb://localhost/repos', {
//   useMongoClient: true,
//   /* other options */
// });

// promise.then(function(db) {
//   console.log(db);
// });

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
              id: String,
            name: String,
             url: String,
     description: String,
     forks_count: Number,
  watchers_count: Number,
      ownerLogin: String,
        ownerUrl: String,
      avatar_url: String
});

let Repo = mongoose.model('Repo', repoSchema);
const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => {console.error.bind(console, 'connection error:')});
db.once('open', function() {
  console.log('connected!');
});

// setInterval(() => {
//   console.log(db._readyState);
// }, 10000);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log(repo.id);
  Repo.find({ id: repo.id}, function(err, docs) {
    if (docs.length === 0) {
      var newRepo = new Repo({ id: repo.id, 
                name: repo.name,
                 url: repo.html_url,
         description: repo.description,
         forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
          ownerLogin: repo.owner.login,
            ownerUrl: repo.owner.url,
          avatar_url: repo.owner.avatar_url
               }); 
      newRepo.save(function (err, repo) {
        if (err) {
          console.log(err);
        }
      });  
    } else {
      console.log(`${repo.id} matches id of record already in DB, it's id is: `, docs.id)
    }
  });
}

let top25 = (callback) => {
  // TODO: Your code here
  // This function should retrieve top 25 dbs
  // the MongoDB

//   models.Post
// .find()
// .sort({'date': -1})
// .limit(20)
// .exec(function(err, posts) {
//      // `posts` will be of length 20
// });
  Repo.find()
    .sort({forks_count: -1})
    .limit(25)
    .exec(function(err, docs) {
      console.log(docs);
      callback(docs);
    });
}

module.exports.save = save;
module.exports.top25 = top25;