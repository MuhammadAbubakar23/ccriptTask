import mongoose from "mongoose";
const Todo = new mongoose.Schema({
  title: String,
  description: String,
});

export const todosCollection = mongoose.models.todos || mongoose.model("todos", Todo);
