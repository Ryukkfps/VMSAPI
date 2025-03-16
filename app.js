const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const blockRoutes = require('./routes/blockRoutes');
const homeRoutes = require('./routes/homeRoutes');
const societyRoutes = require('./routes/societyRoutes');
const unitRoutes = require('./routes/unitRoutes');
const occupancyStatusRoutes = require('./routes/occupancyStatusRoutes');
const ownershipTypeRoutes = require('./routes/ownershipTypeRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const loginRoutes = require('./routes/loginRoutes');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/blocks', blockRoutes);
app.use('/api/homes', homeRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/occupancy-statuses', occupancyStatusRoutes);
app.use('/api/ownership-types', ownershipTypeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/login', loginRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// MongoDB connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;
