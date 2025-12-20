import { Router } from "express";
import { AppDataSource } from "../../data/data-source";
import { User } from "./user.entity";
import { UserLibrary, IUserStorage } from "../../../libs/user-logic";
const router = Router();
const userRepo = AppDataSource.getRepository(User);

const storageAdapter: IUserStorage<User> = {
  getAll: () => userRepo.find({ relations: ["subjects", "tasks"] }),

  create: async (data: any): Promise<User> => {
    const user = userRepo.create(data);
    const savedUser = await userRepo.save(user);
    return Array.isArray(savedUser) ? savedUser[0] : savedUser;
  },

  remove: async (id: string): Promise<boolean> => {
    const result = await userRepo.delete(id);
    return result.affected !== 0;
  },
};

const userLib = new UserLibrary(storageAdapter);

router.get("/", async (req, res) => {
  const users = await userLib.listAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await userLib.addUser(req.body);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const success = await userLib.deleteUser(req.params.id);
  if (!success) return res.status(404).json({ error: "User not found" });
  res.json({ success: true });
});

export default router;
