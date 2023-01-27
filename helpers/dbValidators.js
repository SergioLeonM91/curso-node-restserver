const { Category, Product, Role, User } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

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
        throw new Error(`The user with id ${id} doesn't exists in the DB`);
    }
}

const validatePaginationParams = async(value) => {
    if( value && isNaN(value) ) {
        throw new Error(`${value} is not a number`);
    }
}

const categoryExists = async(id) => {
    const categoryExists = await Category.findById(id);

    if( !categoryExists ) {
        throw new Error(`The category with id ${id} doesn't exists in the DB`);
    }
}

const productExists = async(id) => {
    const productExists = await Product.findById(id);

    if( !productExists ) {
        throw new Error(`The product with id ${id} doesn't exists in the DB`);
    }
}

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }

    return false;
}

const getModel = (collection, id) => {

    return new Promise( async(resolve, reject) => {

        switch (collection) {
            case 'users':
                model = await User.findById(id);

                if(!model) {
                    reject(`Doesn't exist a user with id: ${id}`);
                }
                break;

            case 'products':
                model = await Product.findById(id);

                if(!model) {
                    reject(`Doesn't exist a product with id: ${id}`);
                }
                break;
        
            default:
                reject('That collection validation is not implemented');
                break;
        }

        resolve(model);

    });

}

module.exports = {
    isValidRole,
    emailExists,
    existUserByID,
    validatePaginationParams,
    categoryExists,
    productExists,
    isValidObjectId,
    getModel
}