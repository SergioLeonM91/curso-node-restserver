const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields, 
    validateJWT, 
    hasRole
} = require('../middlewares');

const { isValidRole, emailExists, existUserByID, validatePaginationParams } = require('../helpers');

const { 
    usersGet,
    userPut,
    userPost,
    userDelete,
    userPatch 
} = require('../controllers');

const router = Router();

router.get( '/', [
    check('limit').custom( validatePaginationParams ),
    check('from').custom( validatePaginationParams ),
    validateFields
], usersGet );

router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( existUserByID ),
    check('role').custom( isValidRole ),
    validateFields
], userPut);

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'password need to have minimum 6 characters').isLength({ min: 6 }),
    // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom( emailExists ),
    check('role').custom( isValidRole ),
    validateFields
], userPost);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( existUserByID ),
    validateFields
], userDelete);

router.patch('/', userPatch);

module.exports = router;