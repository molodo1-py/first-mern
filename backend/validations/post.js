import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Enter a title of article').isLength({ min: 3 }).isString(),
    body('text', 'Enter a body (text) of article')
        .isLength({ min: 10 })
        .isString(),
    body('tags', 'Invalid tags format').optional().isArray(),
    body('imageUrl', 'Invalid url to image').optional().isURL()
];
