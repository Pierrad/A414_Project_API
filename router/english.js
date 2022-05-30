const express = require('express');
const router = express.Router();

const EnglishController = require('../controllers/english');

router.get('/', function (req, res) {
    EnglishController.get(req, res);
});

router.get('/words', function (req, res) {
    EnglishController.getWords(req, res);
});

router.get('/colors', function (req, res) {
    EnglishController.getColors(req, res);
});

router.get('/figures', function (req, res) {
    EnglishController.getFigures(req, res);
});

router.get('/verbs', function (req, res) {
    EnglishController.getVerbs(req, res);
});

router.post('/', function (req, res) {
    EnglishController.add(req, res);
});

module.exports = router;