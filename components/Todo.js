import React from "react";
import axios from "axios";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";

const TodoCard = ({ todo, id, setData, onCompleteTodo }) => {
  console.log(todo);
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
          <p>{todo.todo}</p>
        </a>
      </Link>
      <DeleteIcon
        onClick={deleteTodo}
        className="cursor-pointer"
        color="error"
      />

      <button onClick={() => onCompleteTodo(id)}>
        {todo.isCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </button>
      <Link href={`/Todos/edit/${id}`} passHref>
        <EditIcon />
      </Link>
    </div>
  );
};

export default TodoCard;
