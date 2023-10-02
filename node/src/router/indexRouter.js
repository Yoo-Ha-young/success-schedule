const indexController = require("../controller/indexController");

exports.indexRouter = function(app) {
    // 일정 CRUD API
    app.post("/todo", indexController.createTodo); // create
    app.get("/user/:userIdx/todos", indexController.readTodo); // read
    app.patch("/todo", indexController.updateTodo) // update
    app.delete("/user/:userIdx/todo/:todoIdx", indexController.deleteTodo) // delete
};