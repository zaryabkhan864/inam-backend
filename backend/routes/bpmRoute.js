const express = require('express')
const router = express.Router();
const { getPredict } = require('../controllers/bpmController')
console.log('2')
router.route('/predict/:id').get(getPredict);

module.exports = router
