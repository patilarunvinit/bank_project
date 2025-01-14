const { User } = require('../models'); 
const { ReimbursementRequest } = require('../models');

const { LeaveRequest } = require('../models');

const viewPersonalInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId); // This should work now
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};


const submitLeaveRequest = async (req, res) => {
  try {

    const userId = req.user.userId;


    let user = await LeaveRequest.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]  
    });


    if (!user) {
      user = { leaveBalance: 10 };  
    }


    const leaveBalance = user.leaveBalance;


    if (leaveBalance <= 0) {
      return res.status(400).json({ error: 'Insufficient leave balance.' });
    }


    const { start_date, end_date } = req.body;


    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'Both start_date and end_date are required.' });
    }


    const start = new Date(start_date);
    const end = new Date(end_date);
    const dayDiff = Math.ceil((end - start) / (1000 * 3600 * 24));  // Days difference


    if (dayDiff <= 0) {
      return res.status(400).json({ error: 'End date must be later than start date.' });
    }


    if (leaveBalance >= dayDiff) {

      const leaveRequest = await LeaveRequest.create({
        userId: userId,  
        leaveBalance: leaveBalance,  
        status: 'Pending', 
        start_date: start_date,  
        end_date: end_date,      
        dayDiff: dayDiff,        
      });

      res.status(200).json({ message: 'Leave request submitted successfully.' });
    } else {
      res.status(400).json({ error: 'Insufficient leave balance for the requested duration.' });
    }
  } catch (error) {
    console.error('Error during leave request submission:', error);
    res.status(500).json({ error: 'An error occurred while submitting leave request.' });
  }
};


const submitReimbursementRequest = async (req, res) => {
  const { amount } = req.body;

  try {

    const attachment = req.file ? req.file.path : null;


    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }


    const reimbursement = await ReimbursementRequest.create({
      userId: req.user.userId, 
      amount,
      attachment,
    });

    res.status(201).json(reimbursement); 
  } catch (error) {
    console.error('Error creating reimbursement request:', error.message);
    res.status(500).json({ error: 'Error creating reimbursement request' });
  }
};


module.exports = { viewPersonalInfo, submitLeaveRequest, submitReimbursementRequest };