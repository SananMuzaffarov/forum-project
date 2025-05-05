const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, userController.getUsers);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
