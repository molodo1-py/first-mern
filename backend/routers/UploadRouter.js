import express from 'express';
import { UploadController } from '../controllers/index.js';
import { checkAuth } from '../utils/index.js';
import upload from '../fileStorage.js';

const router = express.Router();

router.post('/', checkAuth, upload.single('image'), UploadController.upload);

export default router;
