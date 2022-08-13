import { Grid } from "@mui/material";
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
    <section className="bg-gray-200/50 min-h-screen ">
      <Grid
        container
        // spacing={2}
        className="place-items-center max-w-screen-lg mx-auto min-h-screen "
      >
        <Grid item xs={12} md={4}>
          <AddNewTodo onAddTodo={onAddTodo} />
        </Grid>
        <Grid item xs={12} md={8} className="overflow-auto max-h-72 w-1/2 ">
          <h1 className="sticky top-0 bg-gray-100/50 backdrop-blur-sm w-full text-center ">
            Todos
          </h1>
          <div className="flex flex-col justify-center items-center">
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
        </Grid>
      </Grid>
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
