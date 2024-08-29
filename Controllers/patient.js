const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let patientget = async (req, res) => {
    let sqlQuery = "SELECT * FROM patient";
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

const patientpost = async (req, res) => {
  const { pid,pname, mob, gender, age } = req.body;

  try {
    if (!pid || !pname ||!mob ||!gender ||!age) {
      return res.status(400).send('All fields (pid,pname, mob, gender, age) are required');
    }

    const sqlQuery = "INSERT INTO patient (pid,pname, mob, gender, age) VALUES ($1, $2,$3,$4,$5)";
    const values = [pid,pname, mob, gender, age];

    await pool.query(sqlQuery, values);
    res.json({ success: true, message: 'Pa added successfully' });
  } catch (err) {
    console.error('Error inserting data:', err.message);
    res.status(500).send('Error inserting data');
  }
};
//!---------------------------------->PUT<-------------------------------//

const patientput = (req, res) => {
    const pid = req.params.pid;
    const { pname, mob, gender, age } = req.body;

    if (!pname || !mob || !gender || !age) {
        return res.status(400).send('All fields (pname, mob, gender, age) are required');
    }

    let sqlQuery = `
        UPDATE patient
        SET pname = $1, mob = $2, gender = $3, age = $4
        WHERE pid = $5
    `;
    let values = [pname, mob, gender, age, pid];

    pool.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data: ' + err.message);
        }
        console.log('Data updated successfully');
        res.send({ success: true, message: 'Patient updated successfully' });
    });
};

//!---------------------------------->DELETE<-------------------------------//

const patientdelete = async (req, res) => {
    const pid = req.params.pid;
    try {
        await pool.query('DELETE FROM patient WHERE pid = $1', [pid]);
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { patientget, patientpost, patientput, patientdelete };
