const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let labsget = async (req, res) => {
    let sqlQuery = "SELECT * FROM labs";
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
  
  const labspost = (req, res) => {
    const { labid, labname, roomno} = req.body;
  
    if (!labid || !labname  || !roomno) {
      return res.status(400).send('All fields (labid, labname, roomno) are required');
    }
  
    const sqlQuery = `
      INSERT INTO labs (labid, labname,roomno)
      VALUES ($1, $2,$3)
    `;
    const values = [labid, labname, roomno];
  
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
  
  const labsput = (req, res) => {
    const labid = req.params.labid;
    const { labname, roomno} = req.body;
  
    if (!labname) {
      return res.status(400).send('labs name is required');
    }
  
    let sqlQuery = `
      UPDATE labs
      SET labname = $1,roomno=$2
      WHERE labid= $3
    `;
    let values = [labname,roomno, labid];
  
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
  
  const labsdelete = async (req, res) => {
    const labid = req.params.labid;
    try {
      await pool.query('DELETE FROM labs WHERE labid = $1', [labid]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { labsget, labspost, labsput, labsdelete };
  