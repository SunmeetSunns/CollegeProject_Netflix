const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const omdbProxyRouter = require('./omdbProxy'); // Update the path to omdbProxyRouter

const app = express();

// Enable CORS middleware
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://kaursunmeet624:meet2002@cluster0.oozu3zq.mongodb.net/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected');
});

// User routes
app.use('/api/user', userRoutes);

// Mount the omdbProxyRouter at the appropriate endpoint
app.use('/api/omdbProxy', omdbProxyRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
