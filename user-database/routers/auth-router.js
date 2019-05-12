const authRouter = require("express").Router();
const Users = require("../data/helpers/users-model");

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userID = Math.floor(Math.random() * 1000);

    const user = {
      username,
      password,
      userID
    };
    await Users.add(user);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: "Error adding user" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await Users.findByUsername(username);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
});

module.exports = authRouter;
