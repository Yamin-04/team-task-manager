import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // GET TASKS
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD or UPDATE TASK
  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (editId) {
      await API.put(`/tasks/${editId}`, { text });
      setEditId(null);
    } else {
      await API.post("/tasks", { text });
    }

    setText("");
    fetchTasks();
  };

  // DELETE
  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // EDIT
  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Task Manager</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <h3>Tasks</h3>

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />

          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>

          <button onClick={() => handleEdit(task)}>Edit</button>

          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;