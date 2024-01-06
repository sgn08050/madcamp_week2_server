var crypto = require('crypto');
var uuid = require('uuid');

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Converts to hexa format
    .slice(0, length); // return required number of characters
}

function shaEncryption(passwordHash, salt){
    var hash = crypto.createHmac('sha512', salt); // SHA512
    hash.update(passwordHash);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
}

function saltHashPassword(password){
    var salt = genRandomString(16);
    var passwordData = shaEncryption(password, salt);
    return passwordData;
}

module.exports.saltHashPassword = saltHashPassword