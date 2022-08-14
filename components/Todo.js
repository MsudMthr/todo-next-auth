import React from "react";
import axios from "axios";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Check from "@mui/icons-material/Check";

const TodoCard = ({ todo, id, setData, onCompleteTodo }) => {
  const deleteTodo = () => {
    axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(({ data: { todos } }) => {
        setData(todos);
      });
  };

  return (
    <div className="flex gap-3 p-1 justify-between w-full border-2  border-gray-300/20 rounded  ">
      <Link href={`/Todos/${id}`}>
        <a className="hover:text-sky-500 transition-all duration-300">{todo.todo}</a>
      </Link>
      <div className="flex gap-2">
        <button onClick={() => onCompleteTodo(id)}>
          {todo.isCompleted ? (
            <Check color="success" />
          ) : (
            <span className="block w-5 h-5 border-2 mr-0.5 border-gray-500 rounded-full"></span>
          )}
        </button>
        <DeleteIcon
          onClick={deleteTodo}
          className="cursor-pointer"
          color="error"
        />

        <Link href={`/Todos/edit/${id}`} passHref>
          <EditIcon className="cursor-pointer" color="primary" />
        </Link>
      </div>
    </div>
  );
};

export default TodoCard;
