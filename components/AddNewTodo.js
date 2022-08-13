import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
const AddNewTodo = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isOpenForm, setIsOpenForm] = useState(false);

  //change handler for todo and description inputs
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formOpenHandler = () => {
    setIsOpenForm(!isOpenForm);
  };

  const sendTodoHandler = () => {
    onAddTodo(formData);
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <section className="flex flex-col gap-5 my-2 mx-3 relative">
      {isOpenForm ? (
        <Button variant="contained" onClick={formOpenHandler}>
          Add Todo
        </Button>
      ) : (
        <>
          {/* todo input part */}
          <TextField
            id="standard-basic"
            label="Todo"
            variant="standard"
            name="title"
            value={formData.title}
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
          {/* add todo button  */}
          <div className="flex flex-row-reverse gap-2  items-stretch">
            <Button
              color="success"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendTodoHandler}
              className=""
            >
              Add todo
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={formOpenHandler}
              className=""
            >
              <CloseIcon fontSize="small" />
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default AddNewTodo;
