const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const hrController = require('../controllers/hrController');

router.post('/create-user', authenticateToken, hrController.createUser);
router.get('/leave-requests', authenticateToken, hrController.viewLeaveRequests);
router.post('/leave-requests/:id', authenticateToken, hrController.updateLeaveRequestStatus);
router.get('/reimbursement-requests', authenticateToken, hrController.viewReimbursementRequests);
router.post('/reimbursement-requests/:id', authenticateToken, hrController.updateReimbursementStatus);

module.exports = router;