const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (rep, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rep.body.password, salt);
    const newUser = new User({
      username: rep.body.username,
      email: rep.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (rep, res) => {
  try {
    const user = await User.findOne({ username: rep.body.username });
    !user && res.status(400).json("Wrong uaername");

    const validate = await bcrypt.compare(rep.body.password, user.password);
    !validate && res.status(400).json("Wrong password");

    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
