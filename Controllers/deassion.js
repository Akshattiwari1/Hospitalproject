const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let deassionget = async (req, res) => {
    let sqlQuery = "SELECT * FROM deassion";
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
  
  const deassionpost = (req, res) => {
    const {  eid,roleid } = req.body;
  
    if (! eid|| !roleid) {
      return res.status(400).send('All fields ( eid, dname) are required');
    }
  
    const sqlQuery = `
      INSERT INTO deassion ( eid, roleid)
      VALUES ($1, $2)
    `;
    const values = [ eid, roleid];
  
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
  
  const deassionput = (req, res) => {
    const eid = req.params.eid;
    const { roleid } = req.body;
  
    if (!roleid) {
      return res.status(400).send('departments name is required');
    }
  
    let sqlQuery = `
      UPDATE deassion
      SET roleid = $1
      WHERE eid = $2
    `;
    let values = [roleid, eid];
  
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
  
  const deassiondelete = async (req, res) => {
    const eid = req.params.eid;
    try {
      await pool.query('DELETE FROM deassion WHERE eid = $1', [did]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { deassionget, deassionpost, deassionput, deassiondelete };
  