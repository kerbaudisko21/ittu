import express from 'express';
import { login, regisAndLogin, register } from '../controllers/auth.js';
import multerProfile from '../utils/multerProfile.js';

const router = express.Router();

router.post('/register', multerProfile.single('imageProfile'), register);
router.post('/login', login);
router.post('/regisAndLogin', multerProfile.single('imageProfile'), regisAndLogin);
// router.post("/logout", logout);

export default router;
