const dbValidators = require('../helpers/dbValidators');
const generateJWT = require('../helpers/generateJWT');
const googleVerify = require('../helpers/googleVerify');
const validateUploadFile = require('./validateUploadFile');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...validateUploadFile
}