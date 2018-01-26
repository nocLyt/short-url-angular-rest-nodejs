var mongoose = require('mongoose');
var MY_DB_NAME = "mydb"
var DATABASE_PATH = "mongodb://localhost/" + MY_DB_NAME;

mongoose.connect(DATABASE_PATH);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log("connnect!")
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

