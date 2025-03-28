var CM = require('../model/catmodel')

exports.view = async (req, res) => {
    try {
        const data = await CM.find()
        if (data.length == 0) throw new Error("data not found");

        res.status(200).json({
            status: 'success',
            message: "data found",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })

    }
}
exports.addcat = async (req, res) => {
    try {
        const data = req.body
        const adddata = await CM.create(data)
        res.status(200).json({
            status: 'success',
            message: "data insert",
            data: adddata
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })


    }
}
exports.deletecat = async (req, res) => {
    try {
        const deleteid = req.params.id
        const deletedata = await CM.findByIdAndDelete(deleteid)
        res.status(200).json({
            status: 'success',
            message: "data delete",
            data: deletedata
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })

    }
}

exports.updatecat = async (req, res) => {
    try {
        const updateid = req.params.id
        console.log(updateid);

        const updatedata = await CM.findByIdAndUpdate(updateid, req.body)
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