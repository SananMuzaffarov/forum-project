const Topic = require('../models/topic');
const {jwtDecode} = require("jwt-decode");
const User = require('../models/user');
exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('author', 'username');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching topics' });
    }
};

exports.getTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findById(id).populate({
            path: "author",
            model: User,
            select: "username",
          })
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching topics' });
    }
};

exports.createTopic = async (req, res) => {
    const { title, content, author: authorToken } = req.body;
    const result = jwtDecode(authorToken);
    try {
        const topic = new Topic({ title, content, author: result.id });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating topic' });
    }
};

exports.updateTopic = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const topic = await Topic.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Error updating topic' });
    }
};

exports.deleteTopic = async (req, res) => {
    const { id } = req.params;
    try {
        await Topic.findByIdAndDelete(id);
        res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting topic' });
    }
};