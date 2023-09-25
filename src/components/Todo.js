import React, { useContext, useState } from "react";
import { todosContext } from "../App";

const Todo = ({ todo }) => {
  const { editId, handleCheck, handleDelete, handleEdit, setEditId } =
    useContext(todosContext);
  const [editTodo, setEditTodo] = useState("");
  return (
    <li className="todo" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={editId === todo.id}
        onChange={() => handleCheck(todo.id)}
      />
      {editId === todo.id ? (
        <input
          type="text"
          value={todo.title}
          onChange={(e) => {
            setEditTodo(e.target.value);
            handleEdit(e);
          }}
        />
      ) : (
        <span className={`todo-title ${todo.completed && "checked"}`}>
          {todo.title}
        </span>
      )}
      {editId === todo.id ? (
        <button
          onClick={() => setEditId(null)}
          className={`${editTodo === "" && "hidden"}`}
        >
          ✅
        </button>
      ) : (
        <button
          className="del-button"
          onClick={() => setEditId(todo.id)}
          disabled={todo.completed}
        >
          📘
        </button>
      )}
      <button className="del-button" onClick={() => handleDelete(todo.id)}>
        🗑️
      </button>
    </li>
  );
};

export default Todo;
