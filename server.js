var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./src/routers/main');
var shortenURL = require('./src/routers/shorten-url');
const fallback = require('express-history-api-fallback');

const PORT = require('./src/assets/config').PORT;
const PUBLIC_FILE_NAME = require('./src/assets/config').PUBLIC_FILE_NAME;
var INDEX_PAGE_RELATIVE_PATH = require('./src/assets/config').INDEX_PAGE_RELATIVE_PATH;
const root = path.join(__dirname, PUBLIC_FILE_NAME);



var app = express();
app.use(express.static(root));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// ------- 路由控制
// 1. 展示页面
app.use('/', index);

// 2. API 请求
app.use('/api', shortenURL);

// 配置 fallback
app.use(fallback(INDEX_PAGE_RELATIVE_PATH, {root: __dirname}));

app.listen(PORT, function () {
  console.log('SERVER RUNNING PORT ' + PORT);
});
