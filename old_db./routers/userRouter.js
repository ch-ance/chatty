const userRouter = require("express").Router();

const Users = require("../data/helpers/users-model");

userRouter.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(402).json({ message: "Error retrieving users" });
  }
});

module.exports = userRouter;
