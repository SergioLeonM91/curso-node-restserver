const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generateJWT");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        // Email doesn't exist
        if(!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            })
        }

        // Not active user
        if(!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            })
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        // Incorrect password
        if( !validPassword ) {
            if(!user.status) {
                return res.status(400).json({
                    msg: 'User / Password are not correct'
                })
            }
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact the admin'
        });
    }

}

module.exports = {
    login
}