import { Router } from "express";
import { AppDataSource } from "../../data/data-source";
import { User } from "./user.entity";

const router = Router();
const userRepo = AppDataSource.getRepository(User);

router.get("/", async (req, res) => {
  const users = await userRepo.find({ relations: ["subjects", "tasks"] });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = userRepo.create(req.body);
  await userRepo.save(user);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const result = await userRepo.delete(req.params.id);
  if (result.affected === 0)
    return res.status(404).json({ error: "User not found" });

  res.json({ success: true });
});

export default router;
