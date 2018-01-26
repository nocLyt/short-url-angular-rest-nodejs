
function four04(res, shortURL) {
  console.log("redirect");
  res.redirect("/wrong/"+shortURL);
}

function redirect(res, shortURL, longURL) {
  res.redirect(longURL);  // default code 302
}

function responseShortURL(res, shortURL, longURL) {
  res.json({
    shortURL: shortURL,
    longURL: longURL,
   });
}

exports.responseShortURL = responseShortURL;
exports.redirect = redirect;
exports.four04 = four04;
