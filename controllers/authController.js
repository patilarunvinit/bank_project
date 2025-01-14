const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');  

require('dotenv').config();

const login = async (req, res) => {
  try {
    
    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required'});
    }

    
    const user = await User.findOne({ where: { name: username } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
  }
  else{
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      process.env.JWT_SECRET,                  
      { expiresIn: '1h' }                
    );

    
    
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.name,
        role: user.role
      },
    });
  }

    
    
  }
   catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { login };