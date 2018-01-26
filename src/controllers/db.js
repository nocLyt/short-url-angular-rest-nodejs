var ShortenURL = require("../db/db").ShortenURL;


/**
 * 用于保存 shortURL 和 longURL 进数据库
 *
 * callback(shortURL, longURL)
 *
 * @param {*} shortURL
 * @param {*} longURL
 * @param {*} callback
 */
function saveURLPair(shortURL, longURL, callback) {
    var urlPair = new ShortenURL({
        shortURL: shortURL,
        longURL: longURL,
    });
    urlPair.save(function(err, urlPair){
        if (err) return console.log(+err);
        urlPair.speak();
        return callback(shortURL, longURL);
    });
}


/**
 * 判断 shortURL 是否则 database 中
 * 如果不存在，则调用 callback(false)
 * 存在调用 callback(true);
 * @param {*} shortURL
 * @param {*} callback
 */
function findShortURLExist(shortURL, callback) {
    ShortenURL.findOne(
        {shortURL: shortURL},
        "shortURL longURL",
        function(err, result) {
            if (err)  console.log(err);
            if (result === null) {
                console.log("没找到");
                return callback(false);
            } else {
                console.log("找到啦");
                return callback(true, result.shortURL, result.longURL)
            }
        }
    )
}


/**
 * 查询短链， 根据短链中的哈希值 shortURL 查询是否则数据库中。
 *
 * 回调函数 callback(longURL)
 * 如果短网址不再数据库中，则 longURL === undefined
 * @param {*} shortURL
 * @param {*} callback
 */
function findByShortURL(shortURL, callback) {
    ShortenURL.findOne(
        {shortURL: shortURL},
        "shortURL longURL",
        function(err, res) {
            if (err)  console.log(err);
            if (res === null) {
                console.log("We can't find");
                return callback(undefined);
            } else {
                return callback(res.longURL);
            }
        }
    );
}

//
/**
 * 查询 输入的 longURL 是否则数据库中
 *
 * 如果长网址不再数据库中，则 shortURL === undefined
 * @param {*} longURL
 * @param {*} callback
 */
function findByLongURL(longURL, callback) {
    ShortenURL.findOne(
        {longURL: longURL},
        "shortURL longURL",
        function(err, res) {
            if (err)  console.log(err);
            if (res === null) {
                console.log("We can't find");
                return callback(undefined);
            } else {
                return callback(res.shortURL);
            }
    });
}


exports.saveURLPair = saveURLPair;
exports.findByShortURL = findByShortURL;
exports.findByLongURL = findByLongURL;
exports.findShortURLExist = findShortURLExist;
