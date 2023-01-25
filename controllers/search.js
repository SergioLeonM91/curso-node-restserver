const { response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types;

const searchUsers = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if(isMongoID) {
        const user = await User.findById(term);

        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{ status: true }]
    });

    return res.json({
        results: users
    });
}

const searchCategories = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if(isMongoID) {
        const category = await Category.findById(term);

        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const categories = await Category.find( { name: regex, status: true });

    return res.json({
        results: categories
    });
}

const searchProducts = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term )

    if(isMongoID) {
        const product = await Product.findById(term).populate('category', 'name');

        if(product) {
            return res.json({
                results: product
            });
        }

        const products = await Product.find({category: term}).populate('category', 'name');
        return res.json({
            results: (products) ? [products] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const products = await Product.find({ 
        $or: [{ name: regex }, { description: regex }], 
        $and: [{ status: true }] 
    }).populate('category', 'name');

    return res.json({
        results: products
    });
}

const search = async(req, res = response) => {

    const { collection, term } = req.params;

    switch (collection) {
        case 'categories':
            searchCategories(term, res);
            break;
    
        case 'products':
            searchProducts(term, res);
            break;

        case 'users':
            searchUsers(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'This search is still not implemented'
            })
    }
    
}

module.exports = {
    search
}