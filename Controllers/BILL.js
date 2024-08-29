const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let BILLget = async (req, res) => {
    let sqlQuery = "SELECT * FROM BILL";
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
  
  const BILLpost = (req, res) => {
    const { pid, did,tid, date } = req.body;
  
    if (!did || !did ||!tid || !date ) {
      return res.status(400).send('All fields ( pid, did,tid, date ) are required');
    }
  
    const sqlQuery = `
      INSERT INTO BILL ( pid, did,tid, date )
      VALUES ($1, $2,$3,$4)
    `;
    const values = [ pid, did,tid, date ];
  
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
  
  const BILLput = (req, res) => {
    const pid = req.params.pid;
    const { did, tid, date } = req.body;

    if (!did || !tid || !date) {
      return res.status(400).send('All fields (did, tid, date) are required');
    }

    let sqlQuery = `
      UPDATE BILL
      SET did = $1, tid = $2, date = $3
      WHERE pid = $4
    `;
    let values = [did, tid, date, pid];

    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Error updating data: ' + err.message);
      }
      console.log('Data updated successfully');
      res.send({ success: true, message: 'Bill updated successfully' });
    });
};

  //!---------------------------------->DELETE<-------------------------------//
  
  const BILLdelete = async (req, res) => {
    const pid = req.params.pid;
    const sqlQuery = 'DELETE FROM bill WHERE pid = $1'; // Correctly parameterized query
  
    pool.query(sqlQuery, [pid], (err, result) => {
      if (err) {
        console.log('not deleted', err);
        res.status(500).send({ error: 'Error deleting record', details: err });
      } else {
        console.log('deleted', result);
        res.status(200).send({ message: 'Record deleted successfully', rows: result.rows });
      }
    });
  
  
    // try {
    //   await pool.query('DELETE FROM bill WHERE pid = $1', [pid]);
    //   res.json({ message: 'Record deleted successfully' });
    // } catch (error) {
    //   console.error('Error executing query', error);
    //   res.send(result.rows)
    // }
  };
  
  module.exports = { BILLget, BILLpost, BILLput, BILLdelete };
  