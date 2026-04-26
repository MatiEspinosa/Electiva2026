const mongoose =require("mongoose");
const todosSchema = require("./schemas/todos.schema")

const Todo = mongoose.model("Todo", todosSchema);

module.exports = Todo;