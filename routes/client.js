var express = require('express');
var router = express.Router();

var controller = require('../controllers/client');

router.get('/', controller.index);
router.post('/ticket/', controller.create);
router.get('/ticket/:ticket', controller.render);
router.get('/ticket/:ticket/update', controller.update);

router.param('ticket', controller.find);
module.exports = router;
