const router = require("express").Router();

const User = require("../models/User.model");
const Todo = require("../models/Todo.model");

const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

//Create Todo
router.post("/create", verifyToken, async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    status: req.body.status,
    postedBy: req.user.id,
  });
  try {
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//View User's Todos
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const todo = await Todo.find({ postedBy: req.params.id });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete User's Todos
router.delete("/:id/:todoId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Change Todo
router.put("/:id/:todoId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
