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

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for entry requests
  socket.on('entryRequest', (data) => {
    console.log('Entry request received:', data);
    // Broadcast the entry request to all connected clients except the sender
    socket.broadcast.emit('entryRequest', data);
  });

  // Listen for approval or rejection
  socket.on('entryResponse', (data) => {
    console.log('Entry response received:', data);
    // Broadcast the entry response to all connected clients
    io.emit('entryResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
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
