const auth = require('../controllers/auth');
const categories = require('../controllers/categories');
const products = require('../controllers/products');
const search = require('../controllers/search');
const uploads = require('../controllers/uploads');
const user = require('../controllers/user');

module.exports = {
    ...auth,
    ...categories,
    ...products,
    ...search,
    ...uploads,
    ...user
}