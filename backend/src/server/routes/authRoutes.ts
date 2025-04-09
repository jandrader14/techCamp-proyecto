
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

router.post('/register');
router.post('/login', loginUser);

export default router;