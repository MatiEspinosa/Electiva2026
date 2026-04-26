const {
  getToDos,
  findToDo,
  createToDo,
  deleteToDo,
  updateTodo,
} = require("../repositories/todo.repository");

const getTodosController = async (req, res) => {
  const { id } = req.user;

  try {
    const todos = await getToDos(id);
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

const getTodoController = async (req, res) => {
  const toDoId = req.params.id;
  const { id } = req.user;

  try {
    const toDo = await findToDo(toDoId, id);

    if (toDo) {
      res.status(200).json(toDo);
      return;
    }
    res.status(404).json({
      message: `No se ha encontrado la tarea con id: ${toDoId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

const postTodoController = async (req, res) => {
  const { body, user } = req;

  try {
    await createToDo(body.title, body.description, user.id);
    res.status(201).json({
      message: "Tarea creada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

const deleteTodoController = async (req, res) => {
  const toDoId = req.params.id;
  const { id } = req.user;

  try {
    await deleteToDo(toDoId, id);
    res.status(204).json({
      message: "ToDo eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

const putTodoController = async (req, res) => {
  const toDoId = req.params.id;
  const { body } = req;
  const { id } = req.user;

  try {
    const toDo = updateTodo(toDoId, id, body);
    res.status(200).json(toDo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

module.exports = {
  getTodosController,
  getTodoController,
  postTodoController,
  putTodoController,
  deleteTodoController,
};
