import axios from "axios";
import React, { useState } from "react";

const AddNewTodo = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2 my-2 mx-3">
      <input
        type="text"
        name="title"
        id=""
        className="ring-2 ring-rose-500 outline-none rounded  "
        value={formData.title}
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
      <button
        onClick={() => onAddTodo(formData)}
        className="bg-sky-500 p-1 rounded"
      >
        Add todo
      </button>
    </div>
  );
};

export default AddNewTodo;
