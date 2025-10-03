const todosList = require("../Model/todosModel");

exports.todosItemController = async (req, res) => {
  try {
    const todos = new todosList({
      todo: req.body.text,
      date: req.body.date ? req.body.date : "No time limit",
      isCompleted: req.body.isCompleted,
    });
    await todos.save();
    await res.json(todos);
  } catch (err) {
    err && console.log(err);
  }
};

exports.deleteTodoController = async (req, res) => {
  await todosList.deleteOne({ _id: req.body._id });
  const allTodos = await todosList.find();
  res.status(200).json(allTodos);
};
exports.doneTodoController = async (req, res) => {
  await todosList.findOneAndUpdate({ _id: req.body._id }, [
    { $set: { isCompleted: { $not: "$isCompleted" } } },
  ]);
  const allTodos = await todosList.find();
  res.json(allTodos);
};
exports.getEditValueController = async (req, res) => {
  const editedTodo = await todosList.findByIdAndDelete(req.body._id);
  const allTodos = await todosList.find();
  res.json({ editedTodo, allTodos });
};
exports.getAllTodosControlller = async (req, res) => {
  const todos = await todosList.find();
  res.json(todos);
};
