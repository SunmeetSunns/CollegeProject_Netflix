const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const app = express();

// Enable CORS middleware
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// MongoDB connection
const MongoDBCONNECT = 'mongodb+srv://kaursunmeet624:meet2002@cluster0.oozu3zq.mongodb.net/netflix?retryWrites=true&w=majority';

mongoose.connect(MongoDBCONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB Connected');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// User routes
app.use('/api/user', userRoutes);

// Start server
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});