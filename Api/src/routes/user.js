import { Router } from 'express';
import { validateSignUp, validateLogin } from '../utility/middlewares.js';
import { signUp, login } from '../controller/users.js';

const router = Router();

router.post('/signup', validateSignUp, signUp)
router.post('/login', validateLogin, login)

export default router;