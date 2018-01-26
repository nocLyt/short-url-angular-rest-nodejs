var hashMD5ToInt = require('./hash').hashMD5ToInt;
var intToBase62 = require('./hash').intToBase62;
var findByShortURL = require('../controllers/db').findByShortURL;

var redirect = require('./response').redirect; // !!!
var four04 = require('./response').four04;

function decodeShortURL(shortURL, res) {
    findByShortURL(shortURL, function(longURL) {
        if (longURL === undefined){  // 如果输入的 shortURL 不存在数据库中
            // 重定向到 404 页面，现在只是重定向主页
            // return response.four04(res, shortURL, next);
            four04(res, shortURL);
        } else {  // shortURL 存在
            console.log("shortURL 存在!");
            console.log(shortURL+"\t"+ longURL);
            redirect(res, shortURL, longURL);
        }
    });
}

//

exports.decodeShortURL = decodeShortURL;
