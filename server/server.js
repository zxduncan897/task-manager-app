// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const corsOptions = {
  origin: 'https://task-manager-app-gamma-flax.vercel.app' // <-- Add https://
};



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use('/tasks', taskRoutes);

// Connect to MongoDB (replace with your connection string)
//mongoose.connect('mongodb://localhost:27017/taskmanager', {
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});