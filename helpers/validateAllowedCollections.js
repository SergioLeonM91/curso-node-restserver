const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
];

const validateAllowedCollections = (collection) => {

    if( !allowedCollections.includes( collection ) ) {
        throw new Error(`The allowed collections are: ${ allowedCollections }`);
    }

    return true;
    
}

module.exports = {
    validateAllowedCollections
}