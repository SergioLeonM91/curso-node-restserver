const validateFields = require('../middlewares/validateFields');
const validateFileExists = require('../middlewares/validateFile');
const validateJWT = require('../middlewares/validateJWT');
const validateRole = require('../middlewares/validateRole');

module.exports = {
    ...validateFields,
    ...validateFileExists,
    ...validateJWT,
    ...validateRole
}