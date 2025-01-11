const Todo = require('../models/Todo');

const todoController = {
    // Get all todos
    getAllTodos: async (req, res) => {
        try {
            const todos = await Todo.find({ user: req.user._id })
                .sort({ createdAt: -1 });
            res.json(todos);
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil todos',
                error: error.message
            });
        }
    },

    // Get single todo
    getTodoById: async (req, res) => {
        try {
            const todo = await Todo.findOne({
                _id: req.params.id,
                user: req.user._id
            });

            if (!todo) {
                return res.status(404).json({
                    message: 'Todo tidak ditemukan'
                });
            }

            res.json(todo);
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil todo',
                error: error.message
            });
        }
    },

    // Create new todo
    createTodo: async (req, res) => {
        try {
            const { title, description, dueDate, status } = req.body;

            const todo = new Todo({
                title,
                description,
                dueDate,
                status,
                user: req.user._id
            });

            await todo.save();
            res.status(201).json({
                message: 'Todo berhasil dibuat',
                todo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat membuat todo',
                error: error.message
            });
        }
    },

    // Update todo
    updateTodo: async (req, res) => {
        try {
            const updates = req.body;
            const todo = await Todo.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user._id
                },
                updates,
                { new: true, runValidators: true }
            );

            if (!todo) {
                return res.status(404).json({
                    message: 'Todo tidak ditemukan'
                });
            }

            res.json({
                message: 'Todo berhasil diupdate',
                todo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat mengupdate todo',
                error: error.message
            });
        }
    },

    // Delete todo
    deleteTodo: async (req, res) => {
        try {
            const todo = await Todo.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id
            });

            if (!todo) {
                return res.status(404).json({
                    message: 'Todo tidak ditemukan'
                });
            }

            res.json({
                message: 'Todo berhasil dihapus',
                todo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Terjadi kesalahan saat menghapus todo',
                error: error.message
            });
        }
    }
};

module.exports = todoController;