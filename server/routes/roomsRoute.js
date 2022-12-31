const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();

    return res.json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/:id", async (req, res) => {
  const {id}=req.params
  try {
    const room = await Room.findOne({_id:id});
    console.log(room)
    return res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save()
    res.send('Ajouté')
  } catch (error) {
    return res.status(400).json({error})
  }
});

module.exports = router;
