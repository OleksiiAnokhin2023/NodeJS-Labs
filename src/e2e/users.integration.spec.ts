import request from "supertest";
import express, { Router } from "express";
import { TestDataSource } from "../data/test-data-source";
import { User } from "../modules/users/user.entity";

// Создаем простой тестовый контроллер
const createUsersRouter = (): Router => {
  const router = Router();
  const repo = TestDataSource.getRepository(User);

  router.post("/", async (req, res) => {
    try {
      const user = repo.create(req.body);
      await repo.save(user);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  router.get("/", async (_req, res) => {
    try {
      const users = await repo.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  return router;
};

let app: express.Express;

beforeAll(async () => {
  await TestDataSource.initialize();

  app = express();
  app.use(express.json());
  app.use("/users", createUsersRouter());
});

afterAll(async () => {
  await TestDataSource.destroy();
});

describe("Users Integration Test", () => {
  it("POST /users should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test User");
  });

  it("GET /users should return users", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
