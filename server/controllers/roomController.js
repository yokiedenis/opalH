const Room = require("../models/Room");

// Get all available rooms
exports.getAllRooms = async (req, res) => {
  try {
    console.log(
      "🔄 [roomController] getAllRooms - Fetching available rooms from DB",
    );
    const rooms = await Room.find({ isAvailable: true });
    console.log(`✅ [roomController] Found ${rooms.length} available rooms`);
    res.json({
      success: true,
      data: rooms,
      count: rooms.length,
    });
  } catch (error) {
    console.error(`❌ [roomController] Error in getAllRooms:`, error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    console.log(
      `🔄 [roomController] getRoomById - Looking for room: ${req.params.id}`,
    );
    const room = await Room.findById(req.params.id);
    if (!room) {
      console.warn(`⚠️ [roomController] Room not found: ${req.params.id}`);
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    console.log(`✅ [roomController] Room found: ${room._id}`);
    res.json({ success: true, data: room });
  } catch (error) {
    console.error(`❌ [roomController] Error in getRoomById:`, error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create room (admin only)
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const newRoom = await room.save();
    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update room (admin only)
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    Object.assign(room, req.body);
    room.updatedAt = Date.now();
    const updated = await room.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete room (admin only)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
