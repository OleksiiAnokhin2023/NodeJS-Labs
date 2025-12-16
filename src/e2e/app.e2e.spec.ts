import express, { Router } from "express";
import request from "supertest";
import { TestDataSource } from "../data/test-data-source";
import { User } from "../modules/users/user.entity";
import { Subject } from "../modules/subjects/subject.entity";
import { Task } from "../modules/tasks/task.entity";

// Создаём минимальные роутеры для теста
const createUsersRouter = (): Router => {
  const router = Router();
  const repo = TestDataSource.getRepository(User);

  router.post("/", async (req, res) => {
    const user = repo.create(req.body);
    await repo.save(user);
    res.json(user);
  });

  router.get("/", async (_req, res) => {
    const users = await repo.find();
    res.json(users);
  });

  return router;
};

const createSubjectsRouter = (): Router => {
  const router = Router();
  const repo = TestDataSource.getRepository(Subject);
  const userRepo = TestDataSource.getRepository(User);

  router.post("/", async (req, res) => {
    const user = await userRepo.findOneByOrFail({ id: req.body.userId });
    const subject = repo.create({ title: req.body.title, user });
    await repo.save(subject);
    res.json(subject);
  });

  router.get("/", async (_req, res) => {
    const subjects = await repo.find({ relations: ["user"] });
    res.json(subjects);
  });

  return router;
};

const createTasksRouter = (): Router => {
  const router = Router();
  const repo = TestDataSource.getRepository(Task);
  const userRepo = TestDataSource.getRepository(User);
  const subjectRepo = TestDataSource.getRepository(Subject);

  router.post("/", async (req, res) => {
    const user = await userRepo.findOneByOrFail({ id: req.body.userId });
    const subject = await subjectRepo.findOneByOrFail({
      id: req.body.subjectId,
    });
    const task = repo.create({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      status: req.body.status,
      user,
      subject,
    });
    await repo.save(task);
    res.json(task);
  });

  router.get("/", async (_req, res) => {
    const tasks = await repo.find({ relations: ["user", "subject"] });
    res.json(tasks);
  });

  return router;
};

let app: express.Express;

beforeAll(async () => {
  await TestDataSource.initialize();
  app = express();
  app.use(express.json());
  app.use("/users", createUsersRouter());
  app.use("/subjects", createSubjectsRouter());
  app.use("/tasks", createTasksRouter());
});

afterAll(async () => {
  await TestDataSource.destroy();
});

describe("Full E2E Test", () => {
  let userId: string;
  let subjectId: string;
  let taskId: string;

  it("Create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Demo User", email: "demo@test.com", password: "123" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Demo User");
    userId = res.body.id;
  });

  it("Create subject", async () => {
    const res = await request(app)
      .post("/subjects")
      .send({ title: "Math", userId });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Math");
    subjectId = res.body.id;
  });

  it("Create task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Lab 1",
      description: "Do the lab",
      deadline: "2025-10-10",
      status: "pending",
      userId,
      subjectId,
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Lab 1");
    taskId = res.body.id;
  });

  it("Get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get all subjects", async () => {
    const res = await request(app).get("/subjects");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
