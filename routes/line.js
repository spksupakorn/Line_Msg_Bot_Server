var express = require('express');
var router = express.Router();
const config = require('../config/line');
const service = require('../services/handle-event');

router.post('/callback', config.line.middleware(config.lineConfig), (req, res) => {
  Promise
    .all(req.body.events.map(service.handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

module.exports = router;
