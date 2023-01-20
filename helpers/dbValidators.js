const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if( !roleExists ) {
        throw new Error(`The role ${ role } is not registered in the DB`);
    }
}

const emailExists = async(email = '') => {
    // Verify if email exists
    const emailExists = await User.findOne( { email } );

    if( emailExists ) {
        throw new Error(`The email ${ email } exists in the DB`);
    }
}

const existUserByID = async(id) => {
    const userExists = await User.findById(id);

    if( !userExists ) {
        throw new Error(`The id ${id} doesn't exists in the DB`);
    }
}

const validatePaginationParams = async(value) => {
    if( value && isNaN(value) ) {
        throw new Error(`${value} is not a number`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    existUserByID,
    validatePaginationParams
}