const express = require('express');
const router = express.Router();

const HistoryController = require('../controllers/history');

router.get('/', function (req, res) {
    HistoryController.get(req, res);
});

router.post('/', function (req, res) {
  HistoryController.add(req, res);
});

module.exports = router;