import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} from "./todoSlice";

function TodoList() {
  const todoList = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  // Get input value
  const handleGetInputValue = (event) => {
    setInputValue(event.target.value);
  };

  // Add or update todo
  const handleAddUpdateTodo = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    if (editId) {
      // Update existing todo
      dispatch(
        editTodo({
          id: editId,
          text: trimmedValue,
        })
      );

      setEditId(null);
    } else {
      // Add new todo
      dispatch(addTodo(trimmedValue));
    }

    setInputValue("");
  };

  // Edit todo
  const handleEditTodo = (todo) => {
    setInputValue(todo.text);
    setEditId(todo.id);
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  // Toggle completed
  const handleChecked = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className="todo-container">
      <h2>Redux Toolkit Todo List</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a todo"
          value={inputValue}
          onChange={handleGetInputValue}
        />

        <button onClick={handleAddUpdateTodo}>
          {editId ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleChecked(todo.id)}
            />

            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>

            <button onClick={() => handleEditTodo(todo)}>
              Edit
            </button>

            <button onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;