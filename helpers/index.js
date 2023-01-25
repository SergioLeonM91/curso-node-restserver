const dbValidators = require('../helpers/dbValidators');
const generateJWT = require('../helpers/generateJWT');
const googleVerify = require('../helpers/googleVerify');
const validateAllowedCollections = require('../helpers/validateAllowedCollections');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...validateAllowedCollections
}