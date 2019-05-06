const authRouter = require("express").Router();
const Users = require("../data/helpers/users-model");

authRouter.post("/register", async (req, res) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: "Error adding user" });
  }
});

module.exports = authRouter;
