import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const student = {
    name: "R.Pujitha",
    roll: "24WH1A0597",
  };

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = (text) => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Toggle complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Edit todo text
  const editTodo = (id, newText) => {
    if (!newText.trim()) return;

    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, text: newText, isEditing: false }
          : t
      )
    );
  };

  // Toggle edit mode
  const toggleEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isEditing: !t.isEditing } : t
      )
    );
  };

  // Filter logic
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app-container">
      
      <div className="header">
        <div className="title-section">
          <h1>TODO APPLICATION</h1>
          <p>Manage your daily tasks</p>
        </div>

        <div className="student-badge">
          <span>
            {student.name} <br />
            {student.roll}
          </span>
        </div>
      </div>

      <TodoForm addTodo={addTodo} />

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          style={{ background: filter === "all" ? "#2563eb" : "" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          style={{ background: filter === "active" ? "#2563eb" : "" }}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{ background: filter === "completed" ? "#2563eb" : "" }}
        >
          Completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleEdit={toggleEdit}
      />

      {filteredTodos.length === 0 && (
        <div className="empty">No tasks added yet</div>
      )}
    </div>
  );
}

export default App;