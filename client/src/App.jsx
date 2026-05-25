import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!text) return;

    await API.post("/tasks", { text });

    setText("");
    fetchTasks();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>YAMINI TASK MANAGER 🚀</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id}>{task.text}</div>
      ))}
    </div>
  );
}

export default App;