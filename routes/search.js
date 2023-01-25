const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers');
const { validateAllowedCollections } = require('../helpers');
const { validateFields } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    check('collection').custom( validateAllowedCollections ),
    validateFields
], search);

module.exports = router;