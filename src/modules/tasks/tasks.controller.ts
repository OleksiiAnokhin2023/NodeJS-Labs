import { Router } from "express";
import { AppDataSource } from "../../data/data-source";
import { Task } from "./task.entity";
import { User } from "../users/user.entity";
import { Subject } from "../subjects/subject.entity";

const router = Router();

const taskRepo = AppDataSource.getRepository(Task);
const userRepo = AppDataSource.getRepository(User);
const subjectRepo = AppDataSource.getRepository(Subject);

// Отримати всі завдання
router.get("/", async (req, res) => {
  const tasks = await taskRepo.find({ relations: ["user", "subject"] });
  res.json(tasks);
});

// Створити нове завдання
router.post("/", async (req, res) => {
  const { title, description, deadline, status, userId, subjectId } = req.body;

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) return res.status(400).json({ error: "User not found" });

  const subject = await subjectRepo.findOneBy({ id: subjectId });
  if (!subject) return res.status(400).json({ error: "Subject not found" });

  const task = taskRepo.create({
    title,
    description,
    deadline,
    status,
    user,
    subject,
  });

  await taskRepo.save(task);
  res.json(task);
});

// Оновити статус завдання
router.patch("/:id/status", async (req, res) => {
  const task = await taskRepo.findOne({
    where: { id: req.params.id },
    relations: ["user", "subject"],
  });
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.status = req.body.status;
  await taskRepo.save(task);
  res.json(task);
});

// Оновити завдання повністю (за бажанням)
router.put("/:id", async (req, res) => {
  const task = await taskRepo.findOne({
    where: { id: req.params.id },
    relations: ["user", "subject"],
  });
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, deadline, status, userId, subjectId } = req.body;

  if (userId) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return res.status(400).json({ error: "User not found" });
    task.user = user;
  }

  if (subjectId) {
    const subject = await subjectRepo.findOneBy({ id: subjectId });
    if (!subject) return res.status(400).json({ error: "Subject not found" });
    task.subject = subject;
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.deadline = deadline ?? task.deadline;
  task.status = status ?? task.status;

  await taskRepo.save(task);
  res.json(task);
});

// Видалити завдання
router.delete("/:id", async (req, res) => {
  const result = await taskRepo.delete(req.params.id);
  if (result.affected === 0)
    return res.status(404).json({ error: "Task not found" });

  res.json({ success: true });
});

export default router;
