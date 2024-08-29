// backend/Controllers/Employees.js

const pool = require('../Model/Model');

//!--------------------------------->GET<-------------------------------//

let employeeget = async (req, res) => {
  let sqlQuery = "SELECT * FROM employee";
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Error executing query');
    } else {
      res.send(result.rows);
    }
  });
};

//!---------------------------------->POST<-------------------------------//
const employeepost = async (req, res) => {
  const { eid, name, password, did, roomno } = req.body;

  try {
    await pool.query(
      'INSERT INTO employee (eid, name, password, did, roomno) VALUES ($1, $2, $3, $4, $5)',
      [eid, name, password, did, roomno]
    );
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    if (error.code === '23505') {
      // Handle duplicate key error
      res.status(400).json({ error: 'Employee ID already exists' });
    } else {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

  
//!---------------------------------->PUT<-------------------------------//

const employeeput = (req, res) => {
  const eid = req.params.eid;
  const { name, password, did, roomno } = req.body;

  if (!name || !password || !did || !roomno) {
    return res.status(400).send('All fields (name, password, did, roomno) are required');
  }

  let sqlQuery = `
    UPDATE employee
    SET name=$1, password=$2, did=$3, roomno=$4
    WHERE eid = $5
  `;
  let values = [name, password, did, roomno, eid];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send({ success: true, message: 'Employee updated successfully' });
  });
};

//!---------------------------------->DELETE<-------------------------------//

const employeedelete = async (req, res) => {
  const eid = req.params.eid;

  try {
    await pool.query('DELETE FROM employee WHERE eid = $1', [eid]);
    res.send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { employeeget, employeepost, employeeput, employeedelete };
