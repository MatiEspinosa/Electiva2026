const Todo = require("../models/todo.model");
const connectToRedis = require("../services/redis.service");

const _getToDosRedisKey = (userId) => `userId:${userId}-todos`;

const getToDos = async (userId) => {
  const redisClient = connectToRedis();

  const todosRedisKey = _getToDosRedisKey(userId);

  let todos = await redisClient.get(todosRedisKey);

  if (!todos) {
    console.log("Leyendo desde Mongo");
    todos = await Todo.find({
      userId: userId,
    }).select("title completed");

    redisClient.set(todosRedisKey, JSON.stringify(todos), {ex:3600})

  }else{
    console.log("Leyendo desde Redis");
    
  }

  return todos;
};

const findToDo = async (todoId, userId) => {
  return await Todo.find({
    _id: todoId,
    userId: userId,
  }).select("title completed -_id");
};

const createToDo = async (title, description, userId) => {
  const newToDo = new Todo({
    title: title,
    description: description,
    completed: false,
    userId: userId,
  });

  const redisClient = await connectToRedis();

  redisClient.del(_getToDosRedisKey(userId));

  

  await newToDo.save();
};

const deleteToDo = async (todoId, userId) => {
  return await Todo.deleteOne({
    _id: todoId,
    userId: userId,
  });
};

const updateTodo = async (todoId, userId, payload) => {
  const todo = await Todo.findOne({
    _id: todoId,
    userId: userId,
  });

  if (todo) {
    Object.entries(payload).forEach(([key, value]) => {
      todo[key] = value;
    });
    await todo.save();
  }
  return todo;
};

module.exports = {
  getToDos,
  findToDo,
  createToDo,
  deleteToDo,
  updateTodo,
};
