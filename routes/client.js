var express = require('express');
var router = express.Router();

var controller = require('../controllers/client');

router.get('/', controller.index);
router.post('/ticket/', controller.create);
router.get('/ticket/:ticket', controller.render);
router.post('/ticket/:ticket/update', controller.update);

module.exports = router;
