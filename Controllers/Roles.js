 const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let rolesget = async (req, res) => {
    let sqlQuery = "SELECT * FROM roles";
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
  
  const rolespost = (req, res) => {
    const { roleid, rolename } = req.body;
  
    if (!roleid || !rolename) {
      return res.status(400).send('All fields (roleid, rolename) are required');
    }
  
    const sqlQuery = `
      INSERT INTO roles (roleid, rolename)
      VALUES ($1, $2)
    `;
    const values = [roleid, rolename];
  
    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
      }
      console.log('Data inserted successfully');
      res.send({ success: true, message: 'Roles added successfully' });
    });
  };
  
  //!---------------------------------->PUT<-------------------------------//
  
  const rolesput = (req, res) => {
    const roleid = req.params.roleid;
    const { rolename } = req.body;
  
    if (!rolename) {
      return res.status(400).send('Roles name is required');
    }
  
    let sqlQuery = `
      UPDATE roles
      SET rolename = $1
      WHERE roleid = $2
    `;
    let values = [rolename, roleid];
  
    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Error updating data: ' + err.message);
      }
      console.log('Data updated successfully');
      res.send({ success: true, message: 'Roles updated successfully' });
    });
  };
  
  //!---------------------------------->DELETE<-------------------------------//
  
  const rolesdelete = async (req, res) => {
    const roleid = req.params.roleid;
    try {
      await pool.query('DELETE FROM roles WHERE roleid = $1', [roleid]);
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  
  module.exports = { rolesget, rolespost, rolesput, rolesdelete };
  