const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    check('collection', 'The allowed collections are: categories, products, roles, users').isIn(['categories', 'products', 'roles', 'users']),
    validateFields
], search);

module.exports = router;