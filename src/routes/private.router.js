const express = require("express");
const router = express.Router();

const {
  getTodosController,
  getTodoController,
  postTodoController,
  deleteTodoController,
  putTodoController,
} = require("../controllers/todos.controller");
const payloadMiddleWare = require("../middlewares/paylod.middleware");
const todoSchema = require("./validations/todo.validation");

// Private Routes
router.get("/todos", getTodosController);
router.get("/todos/:id", getTodoController);
router.post("/todos", payloadMiddleWare(todoSchema), postTodoController);
router.delete("/todos/:id", deleteTodoController);
router.put("/todos/:id", putTodoController);

module.exports = router;
