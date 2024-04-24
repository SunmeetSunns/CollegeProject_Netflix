const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const app = express();

const MongoDBCONNECT = 
"mongodb+srv://kaursunmeet624:meet2002@cluster0.oozu3zq.mongodb.net/?tls=true"

// Check if the connection string is defined
if (!MongoDBCONNECT) {
    console.error("MongoDB connection string is not provided.");
    process.exit(1); // Exit the process with an error code
}
// Enable CORS middleware
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(MongoDBCONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected');
});

// User routes
app.use('/api/user', userRoutes);

// Start server
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});