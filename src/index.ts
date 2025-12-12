import express from "express";
import tasksController from "./modules/tasks/tasks.controller";
import subjectsController from "./modules/subjects/subjects.controller";
import usersController from "./modules/users/users.controller";

const app = express();
app.use(express.json());

app.use("/subjects", subjectsController);
app.use("/tasks", tasksController);
app.use("/users", usersController);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
