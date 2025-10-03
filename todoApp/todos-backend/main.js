//external modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//local modules
const todosList = require("./Model/todosModel");
const todosRouter = require("./routes/todosRoute");

const BaseUrl = "mongodb://localhost:27017/todos";
const app = express();
const port = 3000;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/todo", todosRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found 404" });
});
mongoose
  .connect(BaseUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("app is listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });
