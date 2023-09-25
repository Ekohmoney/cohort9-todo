import React, { useContext } from "react";
import Todo from "./Todo";
import { todosContext } from "../App";

const Completed = () => {
  const { todos } = useContext(todosContext);
  const completed = todos.filter((todo) => todo.completed === true);
  return (
    <ul>
      {!!completed.length ? (
        completed.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <p className="text-red-500">There is no Todo</p>
      )}
    </ul>
  );
};

export default Completed;
