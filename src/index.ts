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

const PORT = Number(process.env.PORT) || 3000;

// AppDataSource.initialize()
//   .then(() => {
//     console.log("База даних успішно підключена");

//     app.listen(PORT, () => {
//       console.log(`Сервер запущено на порту ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Помилка під час ініціалізації бази даних:", error);
//   });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер працює на порту ${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("База даних успішно підключена");
  })
  .catch((error) => {
    console.error("Помилка БД (локальна база недоступна):", error);
  });
