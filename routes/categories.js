const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers');
const { 
    validateJWT, 
    validateFields, 
    isAdminRole
} = require('../middlewares');

const { categoryExists, validatePaginationParams } = require('../helpers');

const router = Router();

// Get all categories - public
router.get('/', [
    check('limit').custom( validatePaginationParams ),
    check('from').custom( validatePaginationParams ),
    validateFields
], getCategories);

// Get one category by id - public
router.get('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( categoryExists ),
    validateFields
], getCategory);

// Create category - private - any user with a valid token
router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
], createCategory);

// Update category - private - any user with a valid token
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( categoryExists ),
    check('name', 'name is required').not().isEmpty(),
    validateFields
], updateCategory);

// Delete category - private - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( categoryExists ),
    validateFields
], deleteCategory);

module.exports = router;