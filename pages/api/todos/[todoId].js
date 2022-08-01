import dbConnect from "./../../../server/utils/dbConnect";
import Todo from "../../../server/models/todo";

dbConnect();

export default async function todo(req, res) {

  //* handle DELETE method for todo

  if (req.method === "DELETE") {
    await Todo.findByIdAndDelete(todoId);
    const todos = await Todo.find({});

    return res.status(200).json({
      message: "todo deleted",
      todos,
    });
  } else if (req.method === "GET") {
    const todo = await getOneTodo(req.query);
    return res.status(200).json({
      message: "todo loaded",
      todo,
    });
  } else if (req.method === "PUT") {
    const { body } = req;
    const todo = await Todo.findById(todoId);
    console.log(todoId);
    todo.todo = body.todo.todo;
    todo.description = body.todo.description;
    await todo.save();
    return res.status(200).json({ message: "todo edited" });
  }
}

export async function getOneTodo(query) {
  const todo = await Todo.findById(query);
  return todo;
}
