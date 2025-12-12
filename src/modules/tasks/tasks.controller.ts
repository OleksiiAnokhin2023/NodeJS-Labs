import { Router } from "express";
import { tasks } from "../../data/static";
import { v4 as uuid } from "uuid";

const router = Router();

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, deadline, subjectId, userId } = req.body;

  const newTask = {
    id: uuid(),
    title,
    description,
    deadline,
    status: "pending",
    subjectId,
    userId,
  };

  tasks.push(newTask);

  res.json(newTask);
});

router.patch("/:id/status", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = req.body.status;
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ success: true });
});

export default router;
