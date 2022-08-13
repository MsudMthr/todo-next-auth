import { useRouter } from "next/router";
import React, { useState } from "react";
import { getOneTodo } from "../../api/todos/[todoId]";
import dbConnect from "../../../server/utils/dbConnect";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const EditTodo = ({ todo }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    todo: todo.todo,
    description: todo.description,
  });
  const [isCompletedTodo, setIsCompletedTodo] = useState(todo.isCompleted);
  console.log(todo);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateHandler = () => {
    axios
      .put(`/api/todo/${router.query.todoId}`, { todo: formData })
      .then((res) => {
        console.log(res.data);
        router.push("/Todos");
      });
  };

  return (
    <section className="bg-gray-200/50">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4 min-h-screen">
        {/* todo input part */}
        <TextField
          id="standard-basic"
          label="Todo"
          variant="standard"
          name="todo"
          value={formData.todo}
          onChange={changeHandler}
        />

        {/* description input part */}
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          name="description"
          value={formData.description}
          onChange={changeHandler}
        />
        <div className="flex items-center gap-1 justify-start">
          <input type="checkbox" name="" id="completed" />
          <label htmlFor="completed">complete</label>
        </div>
        {/* add todo button  */}
        <Button
          color="success"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={updateHandler}
          className=""
        >
          Update todo
        </Button>
      </div>
    </section>
  );
};

export default EditTodo;

export const getServerSideProps = async (context) => {
  const { query } = context;
  dbConnect();
  const todo = await getOneTodo(query);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
};
