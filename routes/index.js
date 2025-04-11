var express = require('express');
var router = express.Router();
var multer = require('multer')
var UC = require('../controler/usercontrol')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', UC.viewpage);

router.post('/create', upload.single('image'), UC.createpage)

router.delete('/deletedata/:id', UC.deletedata)

router.patch('/updatedata/:id', upload.single('image'), UC.updatedata)

router.post('/loginUser', UC.loginUser)

module.exports = router;

