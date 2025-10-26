import express from 'express';
import { userController, handleProtectedRoute } from './user.controller';

const router = express.Router();

router.post('/signup',userController.signupUser);
router.post('/login',userController.loginUser);
router.post('/logout',userController.logout);
router.get('/handleRefreshToken',userController.handleRefreshToken);
router.get('/handleProtectedRoute',userController.handleProtectedRoute);

export const userRoutes = router;
