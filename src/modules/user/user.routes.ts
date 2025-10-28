import express from 'express';
import { userController, handleProtectedRoute } from './user.controller';
import { auth } from '../../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.post('/signup',userController.signupUser);
router.post('/login',userController.loginUser);
router.post('/logout',userController.logout);
router.get('/handleRefreshToken',userController.handleRefreshToken);

// Protected route (any logged-in user)
router.get('/handleProtectedRoute',auth(),userController.handleProtectedRoute);

// Admin-only route for test
router.get('/admin-only', auth('ADMIN'), (req, res) => {
  res.json({ message: 'Welcome Admin ', user: (req as any).user });
});

export const userRoutes = router;
