var express = require('express');
var router = express.Router();
var shortenURLByLongURL = require('../utils/shorten-url').shortenURLByLongURL;
var decodeShortURL = require('../utils/decode-url').decodeShortURL;

/**
 * 生成短链的 api  /shorten
 */
router.route('/shorten')
  .post(function(req, res, next){
    var longURL = req.body.longURL;
    return shortenURLByLongURL(longURL, res);
  });


/**
 * 根据短链跳转的 api
 */
router.route('/s/:shortURL')
  .get(function(req, res, next){
    var shortURL = req.params.shortURL;
    decodeShortURL(shortURL, res);
  });

module.exports = router;

