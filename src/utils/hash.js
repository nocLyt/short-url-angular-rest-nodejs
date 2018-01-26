var crypto = require('crypto');


function digitalToBase62(digital){
    var base = 62;
    if (digital < 0){
        return "0";
    } else if (digital > base) {
        digital %= base;
    }
    if (digital >= 36) {
        // 大写字母
        return String.fromCharCode((digital-36) + "A".charCodeAt(0));
    } else if (digital >= 10) {
        // 小写字母
        return String.fromCharCode((digital-10) + "a".charCodeAt(0));
    } else {
        // 数字
        return String.fromCharCode(digital + "0".charCodeAt(0))
    }
}


/**
 * 输入一个 Integer 将它转化成 62 进制数
 * @param {*} shortURLInt
 */
function intToBase62(shortURLInt) {
// //xxxx
//     if (flag)
//         return "phx00"
// //xxxx
    var arr = "00000".split("");
    var base = 62;
    for(var index = 0, sum = shortURLInt; index < arr.length; index ++, sum/=62) {
        var mod = sum % base;
        arr[index] = digitalToBase62(mod);
    }
    return arr.join("");
}

/**
 * 根据 longURL 返回 (16**5) 范围的内的 hash 只
 * 916132832 = 16 ** 5
 * @param {*} longURL
 */
function hashMD5ToInt(longURL) {
    var md5 = crypto.createHash('md5');
    var hash = md5.update(longURL).digest("hex").slice(0, 7);
    var value = parseInt(hash, 16) % (916132832);
    return value;
}

// console.log(intToBase62(hashMD5ToInt("www.baidu.comiewasdf2")));




exports.intToBase62 = intToBase62;
exports.hashMD5ToInt = hashMD5ToInt;


//console.log(intToBase62(91611831));



// function base64(origin_value, offset) {
//     // 修改
//     return "abcde";
// }

// function incBase64(origin_str){
//     // 返回一个 origin_str + 1 的 string
//     return "adsfde";
// }

// function findAGoodShortURL(origin_value, offset, callback){
//     var shortURL = base64(origin_value, offset);
//     findShortURLExis(shortURL, function(isExist) {
//         // 如果存在
//         if (isExist) {

//         } else {
//             // 如果不存在 将shortURL 加入 并返回

//         }
//     })
// }

// /**
//  *
//  * @param {*} longURL
//  * @param {*} callback
//  */
// function geneShortURL(longURL, callback) {
//     // hash 函数
//     // // 取前 8 位. 因为 62 ** 5 - 16 ** 7 > 0 and 62 ** 5 - 16 ** 8 < 0
//     origin_value = hashMD5ToInt(longURL)
//     //
//     findAGoodShortURL(origin_value, 0, callback);
// }

// geneShortURL("www.baidu.cod");
