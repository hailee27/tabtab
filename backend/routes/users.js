const router = require("express").Router();
const User = require("../models/User");
const Card = require("../models/Card");
const bcrypt = require("bcrypt");

//update user
router.put("/update/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update only your account!");
  }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(" User deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("you can delete only your account!");
  }
});

//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user by name
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    if (username) {
      const user = await User.findOne({ username });
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      const user = await User.find().limit(6);
      const currentUser = user.map((u) => {
        const { password, ...others } = u._doc;
        return others;
      });
      res.status(200).json(currentUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
