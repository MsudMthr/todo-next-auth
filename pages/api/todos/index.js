import dbConnect from "./../../../server/utils/dbConnect";
import Todo from "../../../server/models/todo";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { formData } = body;
    console.log(formData);
    await Todo.create({
      todo: formData.title,
      description: formData.description,
    });

    const todos = await Todo.find({});

    return res.status(201).json({
      message: "todo is created",
      todos,
    });
  } else if (method === "GET") {
    const todos = await Todo.find({});
    return res.status(200).json({
      todos,
    });
  }
}
