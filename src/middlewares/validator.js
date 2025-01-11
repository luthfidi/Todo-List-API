const { body, validationResult } = require('express-validator');

// Validator untuk registrasi user
const validateRegister = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username minimal 3 karakter'),
    body('email')
        .isEmail()
        .withMessage('Email tidak valid')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password minimal 6 karakter'),
];

// Validator untuk login
const validateLogin = [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').notEmpty().withMessage('Password diperlukan'),
];

// Validator untuk todo
const validateTodo = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Judul todo diperlukan'),
    body('description')
        .optional()
        .trim(),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Format tanggal tidak valid'),
    body('status')
        .optional()
        .isIn(['pending', 'completed'])
        .withMessage('Status harus pending atau completed'),
];

// Middleware untuk handle hasil validasi
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateTodo,
    validate
};