const Comment = require('../models/comment');
const {jwtDecode} = require("jwt-decode");

exports.getComments = async (req, res) => {
    const { topicId } = req.params;
    try {
        const comments = await Comment.find({ topicId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
};

exports.createComment = async (req, res) => {
    const { content, author: authorToken, topicId } = req.body;
    const author = jwtDecode(authorToken).id;


    try {
        const comment = new Comment({ topicId, content, author });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        console.log(topicId, content, author);
        res.status(500).json({ error: 'Error creating comment' });
    }
};

exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating comment' });
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
};
