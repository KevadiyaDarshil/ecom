
var jwt = require('jsonwebtoken')
exports.AuthSecure = (req, res, next) => {
    console.log("check");

    try {
        const token = req.headers.authorization
        if (!token) throw new Error("Attach Token")

        const tokenVerify = jwt.verify(token, 'ecom')
        if (!tokenVerify) throw new Error('Invalid token')

        next()
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

