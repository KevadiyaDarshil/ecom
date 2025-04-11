const WM = require('../model/wishlist')

exports.create = async function (req, res, body) {
    try {

        var data = req.body

        const createdata = await WM.create(req.body)

        res.status(201).json({
            status: "success",
            message: "add wishlist successfully !",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.viewall = async function (req, res, body) {
    try {
        const viewdata = await WM.find()

        res.status(201).json({
            status: "success",
            message: "User read successfully !",
            viewdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.delete = async function (req, res, body) {
    try {
        const deletedata = await WM.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "success",
            message: "User delete successfully !",
            deletedata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}