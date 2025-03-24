const express = require('express');
const router = express.Router();
const entryPermitController = require('../controllers/entryPermitController');

router.post('/', entryPermitController.createEntryPermit);
router.get('/validate/:passcode', entryPermitController.validateEntryPermit);

module.exports = router;
