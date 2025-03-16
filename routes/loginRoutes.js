const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/sentemailloginotp', loginController.sendEMAILOtp);
router.post('/token', loginController.verification);
router.post('/sentemailregotp', loginController.sendRegEMAILOtp);

module.exports = router;
