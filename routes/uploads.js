const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers');

const { validateFields, validateFileExists } = require('../middlewares');

const router = Router();

router.post('/', validateFileExists, uploadFile);

router.put('/:collection/:id', [
    validateFileExists,
    check('id', 'id need to ve a mongo id').isMongoId(),
    check('collection', 'The allowed collections are: products, users').isIn(['users', 'products']),
    validateFields
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'id need to ve a mongo id').isMongoId(),
    check('collection', 'The allowed collections are: products, users').isIn(['users', 'products']),
    validateFields
], showImage);

module.exports = router;