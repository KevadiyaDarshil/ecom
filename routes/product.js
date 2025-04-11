var express = require('express')
var router = express.Router()
var PC = require('../controler/prodcantrol')
var auth = require('../middlware/Auth')
var multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.get('/', PC.viewprod)
router.post('/addproduct', auth.AuthSecure, upload.single('image'), PC.addprod)
router.delete('/delteproduct/:id', auth.AuthSecure, PC.deleteprod)
router.patch('/updateproduct/:id',upload.single('image'), PC.updateprod)

module.exports = router;
