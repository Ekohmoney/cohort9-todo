import { createContext, useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Todos from "./components/Todos";
import TodoInput from "./components/TodoInput";
import Completed from "./components/Completed";
import Uncompleted from "./components/Uncompleted";
export const todosContext = createContext();
function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [tabId, setTabId] = useState(1);

  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          setTodos(data.slice(0, 10));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => (canceled = true);
  }, []);

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  const handleEdit = (e) => {
    const newTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: e.target.value } : todo
    );
    setTodos(newTodos);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setTodos ([...todos,{ title: title, completed: false, id: todos.length + 1 },
    ]);
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        editId,
        title,
        setTitle,
        handleCheck,
        handleDelete,
        handleEdit,
        setEditId,
        handleCreate,
      }}
    >
      <div className="App">
        <div className="todo-create">
          <TodoInput />
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1">
            <nav
              className="flex space-x-2 text-black"
              aria-label="Tabs"
              role="tablist"
            >
              <button
                type="button"
                className={`py-3 px-4 inline-flex items-center gap-2 ${
                  tabId === 1 ? "bg-white" : "bg-transparent"
                } text-sm text-black hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600`}
                onClick={() => setTabId(1)}
              >
                All
              </button>
              <button
                type="button"
                className={`py-3 px-4 inline-flex items-center gap-2 ${
                  tabId === 2 ? "bg-white" : "bg-transparent"
                } text-sm text-black hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600`}
                onClick={() => setTabId(2)}
              >
                Completed
              </button>
              <button
                type="button"
                className={`py-3 px-4 inline-flex items-center gap-2 ${
                  tabId === 3 ? "bg-white" : "bg-transparent"
                } text-sm text-black hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600`}
                onClick={() => setTabId(3)}
              >
                Uncompleted
              </button>
            </nav>
          </div>
        </div>

        <div className="todo-wrapper">
          {tabId === 1 && <Todos />}
          {tabId === 2 && <Completed />}
          {tabId === 3 && <Uncompleted />}
        </div>
      </div>
    </todosContext.Provider>
  );
}

export default App;
