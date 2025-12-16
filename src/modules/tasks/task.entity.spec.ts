import { Task } from "./task.entity";

describe("Task Entity", () => {
  it("should create a task correctly", () => {
    const task = new Task();
    task.title = "Lab 1";
    task.description = "Do the lab";
    task.status = "pending";

    expect(task.title).toBe("Lab 1");
    expect(task.status).toBe("pending");
    expect(task.description).toBe("Do the lab");
  });
});
