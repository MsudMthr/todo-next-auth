import { useRouter } from "next/router";
import React, { useState } from "react";
import { getOneTodo } from "../../api/todos/[todoId]";

import axios from "axios";
const EditTodo = ({ todo }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    todo: todo.todo,
    description: todo.description,
  });

  console.log(router.query);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateHandler = () => {
    axios.put(`/api/todo/${router.query.todoId}`,{todo : formData}).then((res) => {
      console.log(res.data);
      router.push("/Todos");
    });
  };

  return (
    <div className="flex flex-col gap-2 my-2 mx-3">
      <input
        type="text"
        name="todo"
        id=""
        className="ring-2 ring-rose-500 outline-none rounded  "
        value={formData.todo}
        onChange={changeHandler}
      />
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        value={formData.description}
        onChange={changeHandler}
      ></textarea>
      <button onClick={updateHandler} className="bg-sky-500 p-1 rounded">
        update todo
      </button>
    </div>
  );
};

export default EditTodo;

export const getServerSideProps = async (context) => {
  const { query } = context;
  const todo = await getOneTodo(query.todoId);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
};
