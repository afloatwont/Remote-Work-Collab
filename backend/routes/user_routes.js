import express from 'express';
import { registerUser, loginUser } from '../controllers/user_controller.js';
import { authenticateToken } from '../middlewares/auth_middleware.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;