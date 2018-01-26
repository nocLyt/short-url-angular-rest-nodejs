var mongoose = require('mongoose');
var MY_DB_NAME = "mydb"
var DATABASE_PATH = "mongodb://localhost/" + MY_DB_NAME;

mongoose.connect(DATABASE_PATH);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var shortenURLSchema = mongoose.Schema({
    shortURL: 'string',
    longURL: 'string',
});

shortenURLSchema.methods.speak = function () {
    console.log(
        "LongURL:" + this.longURL +
        "\tShortURL: " + this.shortURL +
        "\tSave success!"
    );
}


var ShortenURL = mongoose.model('ShortenURL', shortenURLSchema);

exports.ShortenURL = ShortenURL;

// var shortURLSchema = new mongoose.Schema({
//     shortUrl: 'string',
//     longUrl: 'string',
// });

// var ShortenURL = new mongoose.model('shortURLSchema', shortURLSchema);


// var ShortenURL = new mongoose.model('ShortenURL', shortURLSchema);

// var tk1 = new Tank({name:"Tank-1", size:"180"});
// var tk2 = new Tank({name:"Tank-2", size:"190"});
// tk1.save();
// tk2.save();

// Tank.find({name: /^Tank-3/}, "name size", (err, person)=> {
//     if (err)
//         return handleError(err);
//     console.log(person);
// });

// exports.db = db;
