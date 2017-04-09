var express = require('express');
var router = express.Router();

var links = [];
var hosts = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'this works.' });
});

router.post('/host', function(req, res, next) {
    if (!req.body.name) throw new Error('parameter `name` is required');
    hosts.push(req.body.name)
    return res.status(202).end();
});

router.get('/hosts', function(req, res, next) {
  return res.json(hosts);
});

router.post('/link', function(req, res, next) {
  res.json({ message: 'this works.(/link)' });
});

router.get('/links', function(req, res, next) {
  res.json({ message: 'this works.(/links)' });
});

// If empty, returns an empty array
router.get('/path/:origin/to/:destination', function(req, res, next) {
  res.json({ message: 'this works.(/path/:origin/to/:destination)' });
});

module.exports = router;
