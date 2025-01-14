const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database'); 
const User = require('../models/User')(sequelize); 
const LeaveRequest = require('../models/LeaveRequest')(sequelize); 
const ReimbursementRequest = require('../models/ReimbursementRequest')(sequelize); 

const createUser = async (req, res) => {
  const { name, address, grade, job_location, reporting_manager, joining_date, role, password } = req.body;
  
  try {

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      name,
      address,
      grade,
      job_location,
      reporting_manager,
      joining_date,
      role,
      password: hashedPassword,
    });


    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
};

const viewLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.findAll();
    res.json(leaveRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching leave requests' });
  }
};



//   console.log(req.body);
//   const { id } = req.params;  // Get the ID from the URL params
//   const { status } = req.body;  // Get the status from the request body

//   try {
//     const leaveRequest = await LeaveRequest.findByPk(id); // Find the leave request by ID

//     if (!leaveRequest) {
//       return res.status(404).json({ error: 'Leave request not found' });
//     }

//     // Only allow "Accepted" or "Rejected" statuses
//     if (status !== 'Accepted' && status !== 'Rejected') {
//       return res.status(400).json({ error: 'Invalid status value. It must be "Accepted" or "Rejected".' });
//     }

//     // If the status is "Accepted", decrease the leave balance for the user in all leave requests
//     if (status === 'Accepted') {
//       // Find all leave requests for the same userId (we want to update all rows where the userId is the same)
//       const userLeaveRequests = await LeaveRequest.findAll({
//         where: { userId: leaveRequest.userId }
//       });

//       // Loop through all leave requests and decrease the leaveBalance by 1
//       await Promise.all(userLeaveRequests.map(async (userLeaveRequest) => {
//         userLeaveRequest.leaveBalance -= 1;

//         // You may want to prevent the balance from going below zero
//         if (userLeaveRequest.leaveBalance < 0) {
//           return res.status(400).json({ error: 'Insufficient leave balance' });
//         }

//         // Save the updated leave request
//         await userLeaveRequest.save();
//       }));

//       // Set the current leave request status to "Accepted"
//       leaveRequest.status = 'Accepted';
//     } else {
//       // If status is "Rejected", just update the status without changing leave balance
//       leaveRequest.status = 'Rejected';
//     }

//     // Save the updated leave request
//     await leaveRequest.save();

//     res.json(leaveRequest);  // Respond with the updated leave request
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error updating leave request status' });
//   }
// };

const updateLeaveRequestStatus = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;  
  const { status } = req.body;  

  try {
    const leaveRequest = await LeaveRequest.findByPk(id); 

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }


    if (status !== 'Accepted' && status !== 'Rejected') {
      return res.status(400).json({ error: 'Invalid status value. It must be "Accepted" or "Rejected".' });
    }


    if (status === 'Accepted') {
      const { dayDiff } = leaveRequest; 

      if (dayDiff <= 0) {
        return res.status(400).json({ error: 'Invalid day difference. It must be greater than 0.' });
      }


      const userLeaveRequests = await LeaveRequest.findAll({
        where: { userId: leaveRequest.userId }
      });


      await Promise.all(userLeaveRequests.map(async (userLeaveRequest) => {
        userLeaveRequest.leaveBalance -= dayDiff;


        if (userLeaveRequest.leaveBalance < 0) {
          return res.status(400).json({ error: 'Insufficient leave balance' });
        }


        await userLeaveRequest.save();
      }));


      leaveRequest.status = 'Accepted';
    } else {

      leaveRequest.status = 'Rejected';
    }


    await leaveRequest.save();

    res.json(leaveRequest);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating leave request status' });
  }
};


const viewReimbursementRequests = async (req, res) => {
  
  try {
    const reimbursementRequests = await ReimbursementRequest.findAll();
    res.json(reimbursementRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching reimbursement requests' });
  }
};

const updateReimbursementStatus = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;  
  const { status } = req.body;  

  try {
    const reimbursementRequest = await ReimbursementRequest.findByPk(id); 

    if (!reimbursementRequest) {
      return res.status(404).json({ error: 'Reimbursement request not found' });
    }


    if (status !== 'Accepted' && status !== 'Rejected') {
      return res.status(400).json({ error: 'Invalid status value. It must be "Accepted" or "Rejected".' });
    }

    reimbursementRequest.status = status;  
    await reimbursementRequest.save();  

    res.json(reimbursementRequest);  
  } catch (error) {
    console.error('Error updating reimbursement request status:', error);
    res.status(500).json({ error: 'Error updating reimbursement request status' });
  }
};

module.exports = { createUser, viewLeaveRequests, viewReimbursementRequests, updateReimbursementStatus, updateLeaveRequestStatus };