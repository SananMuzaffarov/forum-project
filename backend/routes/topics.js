const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topics');
const authMiddleware = require('../middlewares/auth');

router.get('/', topicController.getTopics);
router.get('/:id', topicController.getTopic);
router.post('/', authMiddleware, topicController.createTopic);
router.put('/:id', authMiddleware, topicController.updateTopic);
router.delete('/:id', authMiddleware, topicController.deleteTopic);

module.exports = router;
