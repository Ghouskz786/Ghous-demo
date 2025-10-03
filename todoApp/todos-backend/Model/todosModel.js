const mongoose = require("mongoose");
const todosSchema = mongoose.Schema({
  todo: { type: String, required: true },
  date: String,
  isCompleted: { type: Boolean, required: true, default: false },
  postedDate: { type: Date, default: new Date() },
});
module.exports = mongoose.model("todosList", todosSchema);
