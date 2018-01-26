var ShortenURL = require("../db/db").ShortenURL;


/**
 * 用于保存 shortURL 和 longURL
 *
 * @param {*} shortURL
 * @param {*} longURL
 * @param {*} callback
 */
function saveURLPair(shortURL, longURL, callback) {
    console.log("Function saveURLPair ");
    console.log(shortURL);
    console.log(longURL);
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

// 查询短网址
/**
 * 查询短链
 * 回调函数 callback(longURL)
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

// 查询长网址
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


// var url1 = new ShortenURL({
//     shortUrl: "www.baidu.com",
//     longUrl: "baidu1",
// })

// url1.save(function(err, ele) {
//     if (err) return console.log(err);
//     ele.speak();
// });


// var url2 = new ShortenURL({
//     shortUrl: "www.taobao.com",
//     longUrl: "tb",
// })

// url2.save(function(err, ele) {
//     if (err) return console.log(err);
//     ele.speak();
// });
