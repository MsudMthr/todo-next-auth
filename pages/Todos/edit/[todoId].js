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
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(todo);
  const updateHandler = () => {
    axios
      .put(`/api/todos/${router.query.todoId}`, { todo: formData })
      .then((res) => {
        console.log(res.data);
        router.push("/Todos");
      });
  };

  const completeHandler = (id) => {
    console.log(id);
    axios
      .put(`/api/todos/complete/${id}`)
      .then(({ data }) => {
        setIsCompletedTodo(!isCompletedTodo);
      })
      .then((err) => {
        console.log(err);
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
        {/* complete checkbox Todo */}
        <div className="flex items-center gap-1 justify-start">
          <input
            type="checkbox"
            name=""
            id="completed"
            checked={isCompletedTodo}
            onChange={() => completeHandler(todo._id)}
          />
          <label htmlFor="completed">complete</label>
        </div>
        {/* add todo button  */}
        <div className="flex gap-1 ">
          <Button
            variant="contained"
            color="error"
            onClick={() => router.push("/Todos")}
            className="flex-1"
          >
            <CloseIcon fontSize="small" />
          </Button>
          <Button
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={updateHandler}
            className="flex-[5]"
          >
            Update todo
          </Button>
        </div>
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
