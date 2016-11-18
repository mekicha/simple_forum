var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Web Forum',
  message: 'The data you seek is available at /api/messages' 
});
});

module.exports = router;
