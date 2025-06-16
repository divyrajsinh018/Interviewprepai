const express = require('express');
const {
  CreateSession,
  getSessionById,
  getMySessions,
  deleteSession
} = require('../controllers/sessionControllers');
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/create', protect, CreateSession);
router.get('/my-sessions', protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router; 
