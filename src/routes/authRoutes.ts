import { Router } from 'express';
import { register, login } from '../controllers/authController';
import isAuthenticated from '../middleware/isAuthenticated';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
