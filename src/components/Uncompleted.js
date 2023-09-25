import React, { useContext } from "react";
import Todo from "./Todo";
import { todosContext } from "../App";

const Uncompleted = () => {
  const { todos } = useContext(todosContext);
  const uncompleted = todos.filter((todo) => todo.completed !== true);
  return (
    <ul>
      {!!uncompleted.length ? (
        uncompleted.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <p className="text-red-500">There is no Todo</p>
      )}
    </ul>
  );
};

export default Uncompleted;
