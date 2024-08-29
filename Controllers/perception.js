const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let perceptionget = async (req, res) => {
  let sqlQuery = "SELECT * FROM perception";
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

const perceptionpost = (req, res) => {
  const { pid, did, date, medicine1 } = req.body;

  if (!pid || !did || !date || !medicine1) {
    return res.status(400).send('All fields (pid, did, date, medicine1) are required');
  }

  const checkQuery = 'SELECT 1 FROM perception WHERE pid = $1';
  pool.query(checkQuery, [pid], (err, result) => {
    if (err) {
      console.error('Error checking data:', err);
      return res.status(500).send('Error checking data');
    }

    if (result.rows.length > 0) {
      return res.status(409).send('A record with the given pid already exists');
    }

    const sqlQuery = `
      INSERT INTO perception (pid, did, date, medicine1)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [pid, did, date, medicine1];

    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
      }
      console.log('Data inserted successfully');
      res.send({ success: true, message: 'Perception added successfully' });
    });
  });
};

//!---------------------------------->PUT<-------------------------------//

const perceptionput = (req, res) => {
  const pid = req.params.pid;
  const { did, date, medicine1 } = req.body;

  if (!did || !date || !medicine1) {
    return res.status(400).send('All fields (did, date, medicine1) are required');
  }

  let sqlQuery = `
    UPDATE perception
    SET did = $1, date = $2, medicine1 = $3
    WHERE pid = $4
  `;
  let values = [did, date, medicine1, pid];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send({ success: true, message: 'Perception updated successfully' });
  });
};

//!---------------------------------->DELETE<-------------------------------//

const perceptiondelete = async (req, res) => {
  const pid = req.params.pid;
  try {
    await pool.query('DELETE FROM perception WHERE pid = $1', [pid]);
    res.json({ message: 'Record deleted successfully' });
    console.log("deleted")
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { perceptionget, perceptionpost, perceptionput, perceptiondelete };
