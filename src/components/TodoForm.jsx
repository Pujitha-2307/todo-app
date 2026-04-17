import { useState } from "react";

function TodoForm({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    addTodo(trimmed);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={input}
        placeholder="Enter task..."
        autoFocus
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit" disabled={!input.trim()}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;