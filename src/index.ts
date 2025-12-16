import "reflect-metadata";
import express from "express";
import tasksController from "./modules/tasks/tasks.controller";
import subjectsController from "./modules/subjects/subjects.controller";
import usersController from "./modules/users/user.controller";
import { AppDataSource } from "./data/data-source";

const app = express();
app.use(express.json());

app.use("/subjects", subjectsController);
app.use("/tasks", tasksController);
app.use("/users", usersController);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("База даних успішно підключена");

    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Помилка під час ініціалізації бази даних:", error);
  });
