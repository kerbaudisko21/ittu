import express from 'express';
import { login, regisAndLogin, register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/regisAndLogin', regisAndLogin);
// router.post("/logout", logout);

export default router;
