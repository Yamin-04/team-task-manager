import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
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
        // Update
        await API.put(`/tasks/${editingId}`, {
          text,
        });

        setEditingId(null);
      } else {
        // Add
        await API.post("/tasks", {
          text,
        });
      }

      setText("");
      fetchTasks();
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setText(task.text);
    setEditingId(task._id);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Team Task Manager 🚀</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        {editingId ? "Update Task" : "Add Task"}
      </button>

      <h2 style={{ marginTop: "30px" }}>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              width: "350px",
              borderRadius: "5px",
            }}
          >
            <p>{task.text}</p>

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