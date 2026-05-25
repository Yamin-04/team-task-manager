import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Model
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

// CREATE TASK
app.post("/api/tasks", async (req, res) => {
  const task = await Task.create({ text: req.body.text });
  res.json(task);
});

// GET TASKS
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE TASK
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE TASK (edit + toggle complete)
app.put("/api/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// CONNECT DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));