/**
 * 短链不在数据库中，
 * 则跳转到错误信息提示的页面。
 *
 * @param {*} res
 * @param {*} shortURL
 */
function four04(res, shortURL) {
  console.log("redirect");
  res.redirect("/wrong/"+shortURL);
}

/**
 *
 * 重定向到 longURL,返回代码 code 302
 * @param {*} res
 * @param {*} shortURL
 * @param {*} longURL
 */
function redirect(res, shortURL, longURL) {
  res.redirect(longURL);  // default code 302
}

/**
 * 根据 longURL 生成 shortURL 成功，返回。
 *
 * @param {*} res
 * @param {*} shortURL
 * @param {*} longURL
 */
function responseShortURL(res, shortURL, longURL) {
  res.json({
    shortURL: shortURL,
    longURL: longURL,
   });
}

exports.responseShortURL = responseShortURL;
exports.redirect = redirect;
exports.four04 = four04;
