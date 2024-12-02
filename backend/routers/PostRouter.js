import express from 'express';
import { PostController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { postCreateValidation } from '../validations/post.js';

const router = express.Router();

router.get('/', PostController.getAll);

router.get('/:id', PostController.getOne);

router.post(
    '/',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
);

router.delete('/:id', checkAuth, PostController.remove);

router.patch(
    '/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
);

export default router;
