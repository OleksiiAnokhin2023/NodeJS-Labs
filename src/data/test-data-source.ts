import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Subject } from "../modules/subjects/subject.entity";
import { Task } from "../modules/tasks/task.entity";

export const TestDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  entities: [User, Subject, Task],
});
