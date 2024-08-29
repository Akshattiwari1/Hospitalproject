const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let treatmentget = async (req, res) => {
    let sqlQuery = "SELECT * FROM treatment";
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
  
  const treatmentpost = (req, res) => {
    const {  pid,eid, date } = req.body;
  
    if (!pid || !eid || !date) {
      return res.status(400).send('All fields (pid,eid, date ) are required');
    }
  
    const sqlQuery = `
      INSERT INTO treatment (pid,eid,datr)
      VALUES ($1, $2,$3)
    `;
    const values = [pid,eid, date ];
  
    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
      }
      console.log('Data inserted successfully');
      res.send({ success: true, message: 'departments added successfully' });
    });
  };
  
  //!---------------------------------->PUT<-------------------------------//
  
  const treatmentput = (req, res) => {
    const eid = req.params.eid;
    const { pid, date  } = req.body;
  
    if (!pid||!date) {
      return res.status(400).send('treatment name is required');
    }
  
    let sqlQuery = `
      UPDATE treatment
      SET pid = $1,date=$2
      WHERE eid = $3
    `;
    let values = [pid,eid, date ];
  
    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Error updating data: ' + err.message);
      }
      console.log('Data updated successfully');
      res.send({ success: true, message: 'departments updated successfully' });
    });
  };
  
  //!---------------------------------->DELETE<-------------------------------//
  
  const treatmentdelete = async (req, res) => {
    const eid = req.params.eid;
    try {
      await pool.query('DELETE FROM treatment WHERE eid = $1', [eid]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { treatmentget, treatmentpost, treatmentput, treatmentdelete };
  