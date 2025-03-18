var PM = require('../model/prodmodel')

exports.viewprod = async (req, res) => {
    try {
        const data = await PM.find().populate('cat_name')
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
        data.image = req.file.filename
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
        const updatedata = await PM.findByIdAndUpdate(updateid, req.body, { new: true })
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
