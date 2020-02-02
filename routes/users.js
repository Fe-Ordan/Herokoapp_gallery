var express = require('express');
var router = express.Router();
var controller = require('../controllerGallery');

/* GET home page. */
router.get('/', controllerGallery.home);

module.exports = router;