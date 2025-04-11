var express = require('express');
var router = express.Router();
var CC = require('../controler/catcontrol')
var Auth = require('../middlware/Auth')
/* GET users listing. */
router.get('/', Auth.AuthSecure, CC.view)
router.post('/addcat', CC.addcat)
router.delete('/deletecat/:id', CC.deletecat)
router.patch('/updatecat/:id', CC.updatecat)

module.exports = router;
