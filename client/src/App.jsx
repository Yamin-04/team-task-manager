import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or Update Task
  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, {
          text,
          status,
        });

        setEditingId(null);
      } else {
        await API.post("/tasks", {
          text,
          status,
        });
      }

      setText("");
      setStatus("Pending");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setText(task.text);
    setStatus(task.status);
    setEditingId(task._id);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Team Task Manager 🚀</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "250px",
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              width: "400px",
              borderRadius: "8px",
            }}
          >
            <h3>{task.text}</h3>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <button
              onClick={() => editTask(task)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;