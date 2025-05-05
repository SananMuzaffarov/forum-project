const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');
const authMiddleware = require('../middlewares/auth');

router.get('/:topicId', commentController.getComments);
router.post('/:id', authMiddleware, commentController.createComment);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
