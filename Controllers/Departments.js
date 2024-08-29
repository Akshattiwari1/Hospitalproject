const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let departmentsget = async (req, res) => {
    let sqlQuery = "SELECT * FROM departments";
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
  
  const departmentspost = (req, res) => {
    const { did, dname } = req.body;
  
    if (!did || !dname) {
      return res.status(400).send('All fields (did, dname) are required');
    }
  
    const sqlQuery = `
      INSERT INTO departments (did, dname)
      VALUES ($1, $2)
    `;
    const values = [did, dname];
  
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
  
  const departmentsput = (req, res) => {
    const did = req.params.did;
    const { dname } = req.body;
  
    if (!dname) {
      return res.status(400).send('departments name is required');
    }
  
    let sqlQuery = `
      UPDATE departments
      SET dname = $1
      WHERE did = $2
    `;
    let values = [dname, did];
  
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
  
  const departmentsdelete = async (req, res) => {
    const did = req.params.did;
    try {
      await pool.query('DELETE FROM departments WHERE did = $1', [did]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { departmentsget, departmentspost, departmentsput, departmentsdelete };
  