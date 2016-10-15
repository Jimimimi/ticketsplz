var express = require('express');
var router = express.Router();

var controller = require('../controllers/admin');

router.get('/', controller.index);
router.get('/ticket/:ticket', controller.render);
router.post('/ticket/:ticket/update', controller.update);
router.get('/ticket/:ticket/status', controller.updateStatus);

router.param('ticket', controller.find);

module.exports = router;
