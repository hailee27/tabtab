const router = require("express").Router();
const Card = require("../models/Card");
const User = require("../models/User");
const { verifyToken } = require("../verifyToken");

//create card

router.post("/create/:id", async (req, res) => {
  const userId = req.params.id;
  const newCard = new Card(req.body);
  try {
    const saveCard = await newCard.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { cards: saveCard._id },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json(saveCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update card
router.put("/update/:id", async (req, res) => {
  try {
    const updatecard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatecard);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/delete/:id", async (req, res) => {
  const userId = req.query.userId;
  try {
    const card = await Card.findById(req.params.id);
    if (card.userId === userId || card.username === req.body.username) {
      await card.deleteOne();
      res.status(200).json(card);
    } else {
      res.status(403).json("you can delete only your card");
    }
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { cards: req.params.id },
      });
    } catch (err) {}
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    const cards = await Card.find({ username });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
