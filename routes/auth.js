const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'email is required').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'Google token is required').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;