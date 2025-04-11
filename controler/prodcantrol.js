var PM = require('../model/prodmodel')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dn90zwssz',
    api_key: '697271468158921',
    api_secret: 'lPuAvge6GY9l51aytSZ3gv-upJU' // Click 'View API Keys' above to copy your API secret
});

exports.viewprod = async (req, res) => {
    try {
        const data = await PM.find()
        if (data.length == 0) throw new Error("data not found");
        res.status(200).json({
            status: 'success',
            message: 'data found',
            data: data
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.addprod = async (req, res) => {
    try {
        const data = req.body
        const file = req.file;
        // console.log("file ==> ", file);

        // // Upload the image to Cloudinary, save it under a new folder (e.g., "articles/")
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'news/',  // Specify the folder name where the image will be stored
            public_id: file.filename,  // Optionally, use the original filename or customize it
            resource_type: 'image'  // Make sure to specify it's an image
        });

        // // Add the image URL from Cloudinary to your data object
        data.image = uploadResult.secure_url;
        const adddata = await PM.create(data)
        res.status(200).json({
            status: 'success',
            message: 'add product',
            data: adddata
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}
exports.deleteprod = async (req, res) => {
    try {
        const deleteid = req.params.id
        const deletedata = await PM.findByIdAndDelete(deleteid)
        res.status(200).json({
            status: "success",
            message: "delete product",
            data: deletedata
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}
exports.updateprod = async (req, res) => {
    try {
        const updateid = req.params.id
        var data = req.body

        const file = req.file;
        console.log(file);

        if (file != undefined) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'news/',  // Specify the folder name where the image will be stored
                public_id: file.filename,  // Optionally, use the original filename or customize it
                resource_type: 'image'  // Make sure to specify it's an image
            });

            // // Add the image URL from Cloudinary to your data object
            data.image = uploadResult.secure_url;
        }
        console.log("file ==> ", file);


        // // Upload the image to Cloudinary, save it under a new folder (e.g., "articles/")

        const updatedata = await PM.findByIdAndUpdate(updateid, data, { new: true })
        res.status(200).json({
            status: 'success',
            message: 'data updated',
            data: updatedata
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}
