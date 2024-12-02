import express from 'express';
import { UserController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { registerValidation, loginValidation } from '../validations/index.js';

const router = express.Router();

router.get('/me', checkAuth, UserController.getMe);
router.post(
    '/register',
    registerValidation,
    handleValidationErrors,
    UserController.register
);
router.post(
    '/login',
    loginValidation,
    handleValidationErrors,
    UserController.login
);

export default router;
