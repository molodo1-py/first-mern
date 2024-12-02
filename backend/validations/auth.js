import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body(
        'password',
        'Password must be at least 5 characters and include 1 decimal and 1 letter'
    )
        .isLength({ min: 5 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
];

export const registerValidation = [
    ...loginValidation,
    body(
        'fullName',
        'Full Name is required and minimum itself length is 3 characters'
    ).isLength({ min: 3 }),
    body('avatarUrl', 'Invalid url to Avatar').optional().isURL()
];
