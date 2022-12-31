const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/booking");
const stripe = require("stripe")(
  "sk_test_51J5TX7LLiFJrGSKSKvf4QJMIZjy5jUTX0ogy8QXq7IaomItIs4JjVepjFWsqkd0oAxXWWYBaxfdMPRQ7aabOuJ1400fXagkfNr"
);
const Room = require("../models/rooms");
// const Room = require("../models/rooms");
router.post("/bookroom", async (req, res) => {
  // console.log(req.body)
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    console.log("Pyament")
  } catch (error) {}

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: fromdate,
      todate: todate,
      totalamount,
      totaldays,
      transactionId: "1234",
    });
    const booking = await newbooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentBookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();
    res.send("Bein");
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});


router.get('/:id',async (req,res)=>{
  const {id}=(req.params)
  // console.log(id);
  try {
      const bookings=await Booking.find({userid:id})
      return res.send(bookings)
  } catch (error) {
    console.log(error)
  }
  // console.log(console.log("Salut à tous"));
})

module.exports = router;
