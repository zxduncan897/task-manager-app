const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Configuration ---

// 1. CORS Configuration: Define the options to allow requests ONLY
//    from your Vercel front-end application.
const corsOptions = {
  origin: 'https://task-manager-app-gamma-flax.vercel.app' 
};

// 2. Apply Middleware: The order is critical.
app.use(cors(corsOptions));   // First, handle cross-origin requests.
app.use(express.json());       // Second, parse incoming JSON bodies.

// --- API Routes ---

// 3. Route Handling: Now that the middleware is set up,
//    direct all requests starting with '/tasks' to the taskRoutes handler.
app.use('/tasks', taskRoutes);

// --- Database Connection ---

// Securely connect to the MongoDB Atlas database using the connection string
// stored in your Render environment variables.
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('FATAL ERROR: Failed to connect to MongoDB', err));

// --- Server Startup ---

// A simple root route to confirm the API is running
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});