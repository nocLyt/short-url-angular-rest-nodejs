var findByLongURL = require('../controllers/db').findByLongURL;
var responseShortURL = require('./response').responseShortURL;
hashMD5ToInt = require('./hash').hashMD5ToInt;
var intToBase62 = require('./hash').intToBase62;
var saveURLPair = require('../controllers/db').saveURLPair;
var findShortURLExist = require('../controllers/db').findShortURLExist;


/**
 * longURL: 如数的 longURL
 * shorURLInt: hash 后的一个Int 整数
 *
 * callback 参数 (isExist)
 *
 * @param {*} longURL
 * @param {*} shortURLInt
 * @param {*} shortURL
 * @param {*} callback
 */
function collision(longURL, shortURLInt, shortURL, collisionCount, callback) {
  // console.log("----------------- test Collision ");
  // console.log(longURL);
  // console.log(shortURLInt);
  // console.log(shortURL);
  // console.log(collisionCount);

  findShortURLExist(shortURL, function(isExist){
      // 如果有hash冲突， 则自增 shortURLInt, 获得新的shortURL，继续递归 collision
      if (isExist){
          console.log("Collision happen! This is times " + collisionCount+1);
          newShortURLInt = shortURLInt + 1;
          return collision(longURL, newShortURLInt, intToBase62(newShortURLInt), collisionCount+1, callback);
      } else { // 不存在 hash 冲突， 则储存
          console.log("Collision Over! We all have " + collisionCount + " times. ");
          return saveURLPair(shortURL, longURL, callback);
      }
  });
}


/**
 *
 * 根据 longURL 生成 short URL
 * callback 提供调用返回 http 请求
 *
 * callback(shortURL, longURL)
 * @param {*} longURL
 * @param {*} callback
 */
function geneShortURL(longURL, callback) {
  // shortURLInt 的用途是，遇到冲突后，直接 ++1，省去再 shortURL 再转换一次
  var shortURLInt = hashMD5ToInt(longURL);
  var shortURL = intToBase62(shortURLInt);
  return collision(longURL, shortURLInt, shortURL, 0, callback);
}


/**
 * 获取输入的 longURL，将 longURL hash 出 shortURL并解决冲突问题
 *
 */
function shortenURLByLongURL(longURL, res) {

  findByLongURL(longURL, function(shortURL) {
      // 1. 判断数据 shortURL 是否存在
      if (shortURL === undefined) {   // shortURL 不存在
          // 生成 shortURL (解决冲突) 并使用 res 返回
          // console.log("The LongURL is not in database, we should insert it and generate a short URL");
          return geneShortURL(longURL, function(shortURL, longURL) {
              return responseShortURL(res, shortURL, longURL);
          });
      } else {
          // shortURL 存在，则返回。
          console.log("DB has short URL: " + shortURL);
          return responseShortURL(res, shortURL, longURL);
      }
  });
}

exports.shortenURLByLongURL = shortenURLByLongURL;
