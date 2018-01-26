var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./src/routers/main');
var shortenURL = require('./src/routers/shorten-url');
const port = require('./src/assets/config').PORT;

// 关于 fallback 用法
// http://blog.lsqy.space/2017/03/28/170328%E5%8D%95%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E7%9A%84History%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8Fexpress%E5%90%8E%E7%AB%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E9%85%8D%E5%90%88/
const fallback = require('express-history-api-fallback');


var app = express();
// app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// ------- 路由控制
// 1. 展示页面
app.use('/', index);

// 2. API 请求
app.use('/api', shortenURL);

// 配置 dist
app.use(fallback(__dirname + '/dist/index.html'));

app.listen(port, function () {
  console.log('SERVER RUNNING PORT ' + port);
});
