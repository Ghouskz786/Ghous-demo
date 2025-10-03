const express = require("express");
const todosRouter = express.Router();
const {
  todosItemController,
  getAllTodosControlller,
  deleteTodoController,
  doneTodoController,
  getEditValueController,
} = require("../Controllers/todosController.js");
todosRouter.post("/", todosItemController);

todosRouter.post("/delete", deleteTodoController);
todosRouter.post("/done", doneTodoController);
todosRouter.post("/edit-value", getEditValueController);
todosRouter.get("/all", getAllTodosControlller);
module.exports = todosRouter;
