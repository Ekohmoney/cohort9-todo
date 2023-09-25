import React, { useContext } from "react";
import { todosContext } from "../App";
import Todo from "./Todo";

const Todos = () => {
  const { todos } = useContext(todosContext);
  return (
    <ul>
      {!!todos.length ? (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <p className="text-red-500">There is no Todo</p>
      )}
    </ul>
  );
};

export default Todos;
