import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Team Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add Task</button>

      <hr />

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t._id}>{t.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}