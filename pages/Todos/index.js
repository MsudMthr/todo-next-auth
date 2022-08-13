import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewTodo from "../../components/AddNewTodo";
import TodoCard from "../../components/Todo";
import Todo from "../../server/models/todo";
import dbConnect from "../../server/utils/dbConnect";

const Todos = ({ todos }) => {
  const [data, setData] = useState(todos);

  const onAddTodo = (formData) => {
    axios
      .post("/api/todos/", { formData })
      .then(({ data }) => {
        setData(data.todos);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const completeHandler = (id) => {
    console.log(id);
    axios
      .put(`/api/todos/complete/${id}`)
      .then(({ data }) => {
        setData(data.todos);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-200/50 ">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4 min-h-screen">
        <h1 className="font-bold text-xl">Todo</h1>
        <div className="flex items-center justify-around w-full">
          <AddNewTodo onAddTodo={onAddTodo} />
          <div className="flex flex-col items-center gap-3 overflow-auto max-h-72 ">
            <h1 className="sticky top-0 bg-white/50 backdrop-blur-md w-full text-center ">
              Todos
            </h1>
            {data?.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                id={todo._id}
                setData={setData}
                onCompleteTodo={completeHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todos;

export async function getServerSideProps(context) {
  dbConnect();
  const todos = await Todo.find({});

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
