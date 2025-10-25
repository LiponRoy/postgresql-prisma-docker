import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/signup',userController.signupUser);
router.post('/login',userController.loginUser);

export const userRoutes = router;
