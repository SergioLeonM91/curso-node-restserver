const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/validateJWT');
const validateRole = require('../middlewares/validateRole');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole
}