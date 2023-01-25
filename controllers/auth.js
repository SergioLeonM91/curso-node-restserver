const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT, googleVerify } = require("../helpers");

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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);
        
        let user = await User.findOne({ email });

        if( !user ) {
            const data = {
                name,
                email,
                password: ':p',
                picture,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User( data );
            await user.save();
        }

        if( !user.status ) {
            return res.status(401).json({
                msg: 'Contact the admin, user blocked'
            })
        }

        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token cannot be verified'
        });
    }

}

module.exports = {
    login,
    googleSignIn
}