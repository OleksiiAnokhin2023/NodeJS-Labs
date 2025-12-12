import { v4 as uuid } from "uuid";

export const users = [
  {
    id: uuid(),
    name: "Demo User",
    email: "demo@example.com",
    password: "123456",
  },
];

export const subjects = [
  {
    id: uuid(),
    title: "Math",
    userId: users[0].id,
  },
];

export const tasks = [
  {
    id: uuid(),
    title: "Lab 1",
    description: "Do the lab",
    deadline: "2025-10-10",
    status: "pending",
    subjectId: subjects[0].id,
    userId: users[0].id,
  },
];
