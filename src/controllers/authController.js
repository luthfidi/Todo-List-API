const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    // Register user baru
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: 'Email sudah terdaftar'
                });
            }

            // Create new user
            const user = new User({
                username,
                email,
                password
            });

            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'User berhasil didaftarkan',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat registrasi',
                error: error.message
            });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: 'Email atau password salah'
                });
            }

            // Verify password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Email atau password salah'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login berhasil',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat login',
                error: error.message
            });
        }
    },

    // Get user profile
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            res.json(user);
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil profile',
                error: error.message
            });
        }
    }
};

module.exports = authController;