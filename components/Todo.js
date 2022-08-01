import React from "react";
import axios from "axios";
import Link from "next/link";

const TodoCard = ({ todo, id, setData }) => {
  const deleteTodo = () => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(({ data: { todos } }) => {
        setData(todos);
      });
  };

  return (
    <div className="flex gap-3 my-1 ">
      <Link href={`/Todos/${id}`}>
        <a>
          <p>{todo}</p>
        </a>
      </Link>
      <button onClick={deleteTodo} className="bg-red-500 p-2 rounded">
        delete
      </button>
      <button className="bg-green-500 p-2 rounded">check</button>
      <Link href={`/Todos/edit/${id}`}>
        <a className="bg-blue-500 p-2 rounded">update</a>
      </Link>
    </div>
  );
};

export default TodoCard;
