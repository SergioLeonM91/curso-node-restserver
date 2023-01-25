const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const usersGet = async(req, res) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find( query )
            .skip( from )
            .limit(limit)
    ]);

    res.json({
        total,
        users
    });
}

const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    if( password ) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, data );

    res.json(user);
}

const userPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save data
    await user.save();

    res.json(user);
}

const userDelete = async(req, res) => {

    const { id } = req.params;

    // Delete physically
    // const user = await User.findByIdAndDelete(id);

    // Delete with flag
    const user = await User.findByIdAndUpdate( id, {status: false} );

    res.json(user);
}

const userPatch = (req, res) => {
    res.json({
        msg: 'patch API controller'
    });
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}