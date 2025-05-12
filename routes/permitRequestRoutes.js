const express = require('express');
const router = express.Router();

const permitRequestController = require('../controllers/permitRequestController');


router.post('/', permitRequestController.createPermitRequest);

router.get('/unit/:unitId', permitRequestController.getPermitRequestsByUnit);

router.get('/status/:status', permitRequestController.getPermitRequestsByStatus);

router.get('/:id', permitRequestController.getPermitRequestById);

router.patch('/:id', permitRequestController.updatePermitRequest);

router.delete('/:id', permitRequestController.deletePermitRequest); 


module.exports = router;