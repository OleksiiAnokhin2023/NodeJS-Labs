import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Task } from "../modules/tasks/task.entity";
import { Subject } from "../modules/subjects/subject.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "12345",
  database: "taskmate",
  synchronize: true,
  logging: true,
  entities: [User, Task, Subject],
});
