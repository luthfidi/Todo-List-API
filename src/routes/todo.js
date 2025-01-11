const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo, validate } = require('../middlewares/validator');
const auth = require('../middlewares/auth');

// Middleware auth untuk semua routes
router.use(auth);

// Get all todos
router.get('/', todoController.getAllTodos);

// Get single todo
router.get('/:id', todoController.getTodoById);

// Create new todo
router.post('/', validateTodo, validate, todoController.createTodo);

// Update todo
router.put('/:id', validateTodo, validate, todoController.updateTodo);

// Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;