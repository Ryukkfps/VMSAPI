const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const blockRoutes = require('./routes/blockRoutes');
const homeRoutes = require('./routes/homeRoutes');
const societyRoutes = require('./routes/societyRoutes');
const unitRoutes = require('./routes/unitRoutes');
const occupancyStatusRoutes = require('./routes/occupancyStatusRoutes');
const ownershipTypeRoutes = require('./routes/ownershipTypeRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const loginRoutes = require('./routes/loginRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const entryPermitRoutes = require('./routes/entryPermitRoutes');
const permitRequestsRoutes = require('./routes/permitRequestRoutes');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swagger');
require('dotenv').config();

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
app.use('/api/notifications', notificationRoutes);
app.use('/api/entry-permits', entryPermitRoutes);
app.use('/api/permit-requests', permitRequestsRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// MongoDB connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server after successful DB connection
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;
