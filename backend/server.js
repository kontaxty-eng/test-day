const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const medicinesRoutes = require('./routes/medicines');
app.use('/medicines', medicinesRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Medicines API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
