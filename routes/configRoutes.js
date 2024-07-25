const indexR = require("./index");
const usersR = require("./users");
const tasksR = require("./tasks");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/tasks", tasksR);
};
