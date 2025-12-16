import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Task } from "../modules/tasks/task.entity";
import { Subject } from "../modules/subjects/subject.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433, // Docker порт
  username: "postgres",
  password: "12345", // пароль из docker run
  database: "taskmate",
  synchronize: true, // автоматически создаст таблицы по сущностям
  logging: true,
  entities: [User, Task, Subject],
});
