const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Category, Product } = require('../models');

const getProducts = async(req, res = response) => {
    const { limit = 5, from = 0, available = true } = req.query;
    const queryTotal = { status: true };
    const query = { status: true, available };

    const [total, products] = await Promise.all([
        Product.countDocuments(queryTotal),
        Product.find( query )
            .populate('user', 'name')
            .populate('category', 'name')
            .skip( from )
            .limit(limit)
    ]);

    res.json({
        total,
        products
    });
}

const getProduct = async(req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

    res.json({
        product
    });
}

const createProduct = async(req, res = response) => {

    const { status, user, ...body } = req.body;
    const name = body.name.toUpperCase();
    const productDB = await Product.findOne({name});

    if( productDB ) {
        return res.status(400).json({
            msg: `The product ${productDB.name} already exists on DB`
        })
    }

    const data = {
        name,
        user: req.user._id,
        ...body
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json();
}

const updateProduct = async(req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if(data.category) {
        const validID = isValidObjectId(data.category);

        if( ! validID ) {
            return res.status(400).json({
                msg: `The category id ${data.category} is not valid`
            })
        }

        const categoryDB = await Category.findById(data.category);

        if( ! categoryDB ) {
            return res.status(400).json({
                msg: `The category id ${data.category} does not exist on DB`
            })
        }
    }

    if(data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true } );

    res.json(product);
}

// status: false
const deleteProduct = async(req, res = response) => {
    const { id } = req.params;

    // Delete with flag
    const product = await Product.findByIdAndUpdate( id, {status: false}, { new: true } );

    res.json(product);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}