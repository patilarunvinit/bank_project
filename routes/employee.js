const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const employeeController = require('../controllers/employeeController');
const multer = require('multer');

// Set up file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/personal-info', authenticateToken, employeeController.viewPersonalInfo);
router.post('/leave-request', authenticateToken, employeeController.submitLeaveRequest);
router.post(
  '/reimbursement-request',
  authenticateToken,
  upload.single('attachment'), 
  employeeController.submitReimbursementRequest
);
module.exports = router;