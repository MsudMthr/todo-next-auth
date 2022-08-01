import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewTodo from "../../components/AddNewTodo";
import TodoCard from "../../components/Todo";
import Todo from "../../server/models/todo";

const Todos = ({ todos }) => {
  const [data, setData] = useState(todos);
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("http://localhost:3000/api/todos")
  //     .then(({ data }) => {
  //       setIsLoading(false);
  //       setTodos(data.todos);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  const onAddTodo = (formData) => {
    axios
      .post("/api/todos/", { formData })
      .then(({ data }) => {
        console.log(data);
        setData(data.todos);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <AddNewTodo onAddTodo={onAddTodo} />
      <h1>Todos</h1>
      {data?.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo.todo}
          id={todo._id}
          setData={setData}
        />
      ))}
    </div>
  );
};

export default Todos;

export async function getServerSideProps(context) {
  const todos = await Todo.find({});

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
