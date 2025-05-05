const User = require('../models/user');
const Comment = require('../models/comment');
const Topic = require('../models/topic');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({role:'user'});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await User.findByIdAndDelete(id);
        await Topic.deleteMany({author: id})
        await Comment.deleteMany({author: id})
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
