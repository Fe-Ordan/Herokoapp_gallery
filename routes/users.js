var express = require('express');
var router = express.Router();
var controllerGallery = require('../controllerGallery');

/* GET home page. */
router.get('/', controllerGallery.home);

module.exports = router;