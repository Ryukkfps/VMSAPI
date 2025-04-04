const express = require('express');
const router = express.Router();

const permitRequestController = require('../controllers/permitRequestController');


router.post('/', permitRequestController.createPermitRequest);


module.exports = router;