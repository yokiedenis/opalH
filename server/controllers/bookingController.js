const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      breakfastIncluded,
      totalPrice,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (
      !roomId ||
      !guestName ||
      !guestEmail ||
      !guestPhone ||
      !checkInDate ||
      !checkOutDate ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    const bookingId = `BOOK-${Date.now()}`;
    const booking = new Booking({
      bookingId,
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      breakfastIncluded,
      breakfastPrice: breakfastIncluded ? 10000 : 0,
      totalPrice,
      specialRequests,
    });

    const newBooking = await booking.save();
    res.status(201).json({
      success: true,
      data: newBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    Object.assign(booking, req.body);
    booking.updatedAt = Date.now();
    const updated = await booking.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    booking.bookingStatus = "cancelled";
    booking.updatedAt = Date.now();
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all bookings (Admin only)
exports.getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
