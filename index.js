const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo"); // Require the Task model

const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const URL = "mongodb://localhost:27017/ToDoList";
mongoose.connect(URL, {});

app.get("/", (req, res) => {
    Todo.find()
    .then(result => {
        res.render("index", { data: result })
        console.log(result)
    })
});

app.post("/", (req,res) => {
    const todo = new Todo ({ // Use Task instead of TaskModel
        todo: req.body.aTask
    });
    todo.save()
    .then(result => {
        res.redirect("/")
    })
});

app.delete("/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(result => {
        console.log(result)
    })

})

app.put("/:id", (req, res) => {
    const todoId = req.params.id;
    const updatedTodoText = req.body.updatedText;

    Todo.findByIdAndUpdate(todoId, { todo: updatedTodoText })
        .then(() => {
            res.send("Task updated successfully");
        })
        .catch(err => {
            console.error("Error updating task:", err);
            res.status(500).send("Error updating task");
        });
});


app.listen(port, () => {
    console.log("Server on port: " + port);
});
