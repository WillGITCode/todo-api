var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/todo-api");

mongoose.Promise = global.Promise;

module.exports.Todo = require("./todo");