import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
  subject: String,
  message: String,
  // status: {
  //   type: String,
  //   default: "pending",
  // },
});

const TodoList = models.todo || model("todo", todoSchema);

export default TodoList;
