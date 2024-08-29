const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let Empprofileget = async (req, res) => {
  let sqlQuery = "SELECT * FROM Empprofile";
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

const Empprofilepost = (req, res) => {
  const { eid, ename, e_adhar, e_password } = req.body;

  if (!eid || !ename || !e_adhar || !e_password) {
    return res.status(400).send('All fields (eid, ename, e_adhar, e_password) are required');
  }

  const sqlQuery = `
    INSERT INTO Empprofile (eid, ename, e_adhar, e_password)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [eid, ename, e_adhar, e_password];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully');
    res.send({ success: true, message: 'Employee profile added successfully' });
  });
};

//!---------------------------------->PUT<-------------------------------//

const Empprofileput = (req, res) => {
  const eid = req.params.eid;
  const { ename, e_adhar, e_password } = req.body;

  if (!ename || !e_adhar || !e_password) {
    return res.status(400).send('All fields (ename, e_adhar, e_password) are required');
  }

  let sqlQuery = `
    UPDATE Empprofile
    SET ename=$1, e_adhar=$2, e_password=$3
    WHERE eid = $4
  `;
  let values = [ename, e_adhar, e_password, eid];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send({ success: true, message: 'Employee profile updated successfully' });
  });
};

//!---------------------------------->DELETE<-------------------------------//

const Empprofiledelete = async (req, res) => {
  const eid = req.params.eid;
  try {
    await pool.query('DELETE FROM Empprofile WHERE eid = $1', [eid]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Empprofileget, Empprofilepost, Empprofileput, Empprofiledelete };
