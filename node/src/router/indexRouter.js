const indexController = require("../controller/indexController");

exports.indexRouter = function(app) {
    app.post("/todo", indexController.createTodo); // create
};