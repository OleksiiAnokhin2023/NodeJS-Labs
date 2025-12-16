import { Router } from "express";
import { AppDataSource } from "../../data/data-source";
import { Subject } from "./subject.entity";

const router = Router();
const subjectRepo = AppDataSource.getRepository(Subject);

router.get("/", async (req, res) => {
  const subjects = await subjectRepo.find({ relations: ["user", "tasks"] });
  res.json(subjects);
});

router.post("/", async (req, res) => {
  const subject = subjectRepo.create(req.body);
  await subjectRepo.save(subject);
  res.json(subject);
});

router.delete("/:id", async (req, res) => {
  const result = await subjectRepo.delete(req.params.id);
  if (result.affected === 0)
    return res.status(404).json({ error: "Subject not found" });

  res.json({ success: true });
});

export default router;
