import { Router } from "express";
import { subjects } from "../../data/static";
import { v4 as uuid } from "uuid";

const router = Router();

router.get("/", (req, res) => res.json(subjects));

router.post("/", (req, res) => {
  const { title, userId } = req.body;
  const newSubject = { id: uuid(), title, userId };
  subjects.push(newSubject);
  res.json(newSubject);
});

router.delete("/:id", (req, res) => {
  const index = subjects.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Subject not found" });
  subjects.splice(index, 1);
  res.json({ success: true });
});

export default router;
