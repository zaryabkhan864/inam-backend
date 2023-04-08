const express = require('express')
const router = express.Router();
const { getPredict } = require('../controllers/bpmController')
router.route('/predict/:id').get(getPredict);

module.exports = router
