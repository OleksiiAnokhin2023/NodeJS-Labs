import { Router } from "express";
import { users } from "../../data/static";
import { v4 as uuid } from "uuid";

const router = Router();

router.get("/", (req, res) => res.json(users));

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: uuid(), name, email, password };
  users.push(newUser);
  res.json(newUser);
});

export default router;
