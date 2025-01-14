const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const hrRoutes = require('./routes/hr');

require('dotenv').config();


app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/hr', hrRoutes);

app.listen(3001, () => {
  console.log('Server running on port 3000');
});


const { sequelize } = require('./models');

