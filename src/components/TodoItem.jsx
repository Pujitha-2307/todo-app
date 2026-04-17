import { useState, useEffect } from "react";

function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
  toggleEdit,
}) {
  const [newText, setNewText] = useState(todo.text);

  // Sync text when switching to edit mode
  useEffect(() => {
    setNewText(todo.text);
  }, [todo.isEditing, todo.text]);

  const handleSave = () => {
    if (!newText.trim()) return;
    editTodo(todo.id, newText);
  };

  return (
    <div className="todo-item">
      
      {/* LEFT SIDE */}
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {!todo.isEditing ? (
          <span
            className={todo.completed ? "done" : ""}
            onDoubleClick={() => toggleEdit(todo.id)}
          >
            {todo.text}
          </span>
        ) : (
          <input
            value={newText}
            placeholder="Edit task..."
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="actions">
        {!todo.isEditing ? (
          <button onClick={() => toggleEdit(todo.id)}>
            Edit
          </button>
        ) : (
          <button onClick={handleSave}>
            Save
          </button>
        )}

        <button onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;