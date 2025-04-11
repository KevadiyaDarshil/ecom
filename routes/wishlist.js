var express = require('express');
var router = express.Router();
let WC = require('../controler/wishlist')

/* GET home page. */
router.post('/', WC.create);
router.get('/view', WC.viewall);
router.delete('/:id', WC.delete);

module.exports = router;
