const { response } = require("express");
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const {validateUploadFile, productExists, getModel} = require('../helpers');
const { User, Product } = require("../models");


const uploadFile = async(req, res = response) => {

    try {

        //const name = await validateUploadFile( req.files, ['txt', 'md'], 'text' );
        const name = await validateUploadFile( req.files, undefined, 'imgs' );
    
        res.json({
            name
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}

const updateImage = async(req, res = response) => {

    const { collection, id } = req.params;

    let model;

    try {
        model = await getModel(collection, id);
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: error});
    }

    if(model.img) {
        const imagePath = path.join(__dirname, '/../uploads', collection, model.img);

        if(fs.existsSync( imagePath )) {
            fs.unlinkSync( imagePath );
        }

    }

    model.img = await validateUploadFile( req.files, undefined, collection );
    
    await model.save();

    res.json(model);
}

const updateImageCloudinary = async(req, res = response) => {

    const { collection, id } = req.params;

    let model;

    try {
        model = await getModel(collection, id);
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: error});
    }

    if(model.img) {

        const arrName = model.img.split('/');
        const name = arrName[ arrName.length - 1 ];
        const [ publicID ] = name.split('.');

        cloudinary.uploader.destroy( publicID );

    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
    
    await model.save();

    res.json(model);
}

const showImage = async(req, res = response) => {

    const { collection, id } = req.params;

    let model;

    try {
        model = await getModel(collection, id);
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: error});
    }

    if(model.img) {
        return res.json({img: model.img});
    }

    const imagePath = path.join(__dirname, '/../assets/no-image.jpg');

    return res.sendFile( imagePath );
}

module.exports = {
    showImage,
    uploadFile,
    updateImage,
    updateImageCloudinary
}