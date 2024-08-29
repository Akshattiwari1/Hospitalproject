const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let testrateget = async (req, res) => {
    let sqlQuery = "SELECT * FROM testrate";
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
  
  const testratepost = (req, res) => {
    const {labid , testid , price , testname} = req.body;
  
    if (!labid||!testid || !price  || !testname) {
      return res.status(400).send('All fields (labid , testid , price , testname) are required');
    }
  
    const sqlQuery = `
      INSERT INTO testrate (labid , testid , price , testname)
      VALUES ($1, $2,$3,$4)
    `;
    const values = [labid , testid , price , testname];
  
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
  
  const testrateput = (req, res) => {
    const testid = req.params.testid;
  const { labid, price, testname } = req.body;

  // Basic validation
  if (!labid || !price || !testname) {
    return res.status(400).json({ error: 'Lab ID, Price, and Test Name are required' });
  }

  // Update query
  const sqlQuery = `
    UPDATE testrate
    SET labid = $1, price = $2, testname = $3
    WHERE testid = $4
  `;
  const values = [labid, price, testname, testid];

  // Execute query
  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ error: 'Error updating data: ' + err.message });
    }
    console.log('Data updated successfully');
    res.json({ success: true, message: 'Data updated successfully' });
  });
};

  
  //!---------------------------------->DELETE<-------------------------------//
  
  const testratedelete = async (req, res) => {
    const testid = req.params.testid;
    try {
      await pool.query('DELETE FROM testrate WHERE testid = $1', [testid]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = { testrateget, testratepost, testrateput, testratedelete };
  