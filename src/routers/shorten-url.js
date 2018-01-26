var express = require('express');
var router = express.Router();
var shortenURLByLongURL = require('../utils/shorten-url').shortenURLByLongURL;
var decodeShortURL = require('../utils/decode-url').decodeShortURL;



router.route('/shorten')
  .post(function(req, res, next){
    // http://http://localhost:8081/
    // 前端来判断是否为空
    var longURL = req.body.longURL;
    // var longURL = req.query.longURL  // 这个地方有问题，不知道为啥 req.body 获得不了数据
    return shortenURLByLongURL(longURL, res);
  });

// 测试  http://localhost:8081/api/s/h8fBd
router.route('/s/:shortURL')
.get(function(req, res, next){
  // 如果为空，怎么跳转?
  var shortURL = req.params.shortURL;
  decodeShortURL(shortURL, res);
});

module.exports = router;

