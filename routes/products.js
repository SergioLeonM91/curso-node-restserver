const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers');
const { 
    validateJWT, 
    validateFields, 
    isAdminRole
} = require('../middlewares');

const { productExists, categoryExists, validatePaginationParams } = require('../helpers');

const router = Router();

router.get('/', [
    check('limit').custom( validatePaginationParams ),
    check('from').custom( validatePaginationParams ),
    validateFields
], getProducts);

router.get('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'Is not a valid ID').isMongoId(),
    check('category').custom( categoryExists ),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], deleteProduct);

module.exports = router;