import { useEffect, useState } from "react";
import API from "./api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔢 Calculations
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "DONE"
  ).length;

  const pendingTasks = tasks.filter(
    (t) => t.status !== "DONE"
  ).length;

  const overdueTasks = tasks.filter((t) => {
    return (
      t.status !== "DONE" &&
      new Date(t.due_date) < new Date()
    );
  }).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        📊 Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <Card title="Total Tasks" value={totalTasks} color="blue" />
        <Card title="Completed" value={completedTasks} color="green" />
        <Card title="Pending" value={pendingTasks} color="yellow" />
        <Card title="Overdue" value={overdueTasks} color="red" />

      </div>

      {/* TASK LIST */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent Tasks
        </h2>

        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {task.due_date}
                </p>
              </div>

              <span
                className={`px-2 py-1 text-sm rounded ${
                  task.status === "DONE"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Card Component
function Card({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colors[color]}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default Dashboard;