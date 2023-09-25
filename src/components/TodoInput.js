import React, { useContext } from "react";
import { todosContext } from "../App";





const TodoInput = () => {
  const { handleCreate, setTitle, title } = useContext(todosContext);
  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        className="todo-input"
        name="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="todo-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TodoInput;
