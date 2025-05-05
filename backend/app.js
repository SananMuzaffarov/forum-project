const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const topicRoutes = require('./routes/topics');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Forum API');
});

module.exports = app;
