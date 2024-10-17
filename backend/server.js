const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;



// Using Middleware
app.use(bodyParser.json());
app.use(cors());


// Connecting MongoDB
mongoose.connect('mongodb://localhost:27017/blog')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('DB Error', err));

// Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);


//app.listen(8000, () => console.log(`Server Running on Port `))
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});