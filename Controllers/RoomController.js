const pool = require('../Model/Model');

// GET all rooms
const Roomsget = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM rooms";
    const result = await pool.query(sqlQuery);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving rooms');
  }
};

// POST a new room
const Roomspost = async (req, res) => {
  const { room_no, room_name } = req.body;

  try {
    if (!room_no || !room_name) {
      return res.status(400).send('All fields (room_no, room_name) are required');
    }

    const sqlQuery = "INSERT INTO rooms (room_no, room_name) VALUES ($1, $2)";
    const values = [room_no, room_name];

    await pool.query(sqlQuery, values);
    res.json({ success: true, message: 'Room added successfully' });
  } catch (err) {
    console.error('Error inserting data:', err.message);
    res.status(500).send('Error inserting data');
  }
};

// PUT update room by room_no
const Roomsput = async (req, res) => {
  const room_no = req.params.room_no;
  const { room_name } = req.body;

  try {
    if (!room_name) {
      return res.status(400).send('Room name is required');
    }

    const sqlQuery = "UPDATE rooms SET room_name = $1 WHERE room_no = $2";
    const values = [room_name, room_no];

    await pool.query(sqlQuery, values);
    res.json({ success: true, message: 'Room updated successfully' });
  } catch (err) {
    console.error('Error updating data:', err.message);
    res.status(500).send('Error updating data');
  }
};

// DELETE room by room_id
const Roomsdelete = async (req, res) => {
  const room_no = req.params.room_no;

  try {
    const sqlQuery = 'DELETE FROM rooms WHERE room_no = $1';
    await pool.query(sqlQuery, [room_no]);
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err.message);
    res.status(500).send('Error deleting data');
  }
};

module.exports = { Roomsget, Roomspost, Roomsput, Roomsdelete };
