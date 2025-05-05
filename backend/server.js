const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/config');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log('Request received:', req.method, req.path);
    next();
  });
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });