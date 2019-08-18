const mongoose = require('mongoose');

const herokuMongoUri = 'mongodb://heroku_fm1933fs:9lhbsnq2f4jlfu6qqs865lociv@ds263927.mlab.com:63927/heroku_fm1933fs';


// Currently set up to work locally, will have to switch connection here to make it work on heroku
mongoose.connect('mongodb://localhost/repos', { useNewUrlParser: true });
// mongoose.connect(herokuMongoUri, { useNewUrlParser: true });

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

let save = (repo, callback) => {  // No callback being sent atm, not hurting anything to just have it here...
                                  // will add eventually.
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

//   models.Post     EXAMPLE FROM STACKOVERFLOW
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