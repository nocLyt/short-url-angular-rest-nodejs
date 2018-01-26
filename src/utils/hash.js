var crypto = require('crypto');
const MOD625 = 916132832;

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
    var value = parseInt(hash, 16) % MOD625;
    return value;
}

function incHashValue(value) {
  return (value + 1) % MOD625;
}

exports.intToBase62 = intToBase62;
exports.hashMD5ToInt = hashMD5ToInt;
