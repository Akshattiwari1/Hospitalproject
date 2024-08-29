const pool = require('../Model/Model');

const Role_assions_get = (req, res) => {
    const sql = "SELECT roleid, rolename FROM role_assions NATURAL JOIN roles WHERE eid=$1";
    pool.query(sql, [req.params.eid], (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result.rows);
        }
    });
};

const Role_assions_post = async (req, res) => {
    const { eid, roleid } = req.body;
    
    const checkSql = "SELECT * FROM role_assions WHERE eid = $1 AND roleid = $2";
    const insertSql = "INSERT INTO role_assions (roleid, eid) VALUES ($1, $2)";

    try {
        const checkResult = await pool.query(checkSql, [eid, roleid]);
        if (checkResult.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'Role assignment already exists' });
        }

        await pool.query(insertSql, [roleid, eid]);
        res.status(201).json({ success: true, message: 'Role assignment created successfully' });
    } catch (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).send('Error inserting data');
    }
};

const Role_assions_put = async (req, res) => {
    const eid = req.params.eid;
    const { roleid } = req.body;

    try {
        if (!roleid) {
            return res.status(400).send('roleid is required');
        }

        const sqlQuery = "UPDATE role_assions SET roleid = $1 WHERE eid = $2";
        const values = [roleid, eid];

        await pool.query(sqlQuery, values);
        res.json({ success: true, message: 'Role assignment updated successfully' });
    } catch (err) {
        console.error('Error updating data:', err.message);
        res.status(500).send('Error updating data');
    }
};

const Role_assions_delete = async (req, res) => {
    const eid = req.params.eid;
    const roleid = req.params.roleid;

    try {
        const sqlQuery = 'DELETE FROM role_assions WHERE eid = $1 and roleid = $2';
        await pool.query(sqlQuery, [eid, roleid]);
        res.json({ success: true, message: 'Role assignment deleted successfully' });
    } catch (err) {
        console.error('Error deleting data:', err.message);
        res.status(500).send('Error deleting data');
    }
};

module.exports = { Role_assions_get, Role_assions_post, Role_assions_put, Role_assions_delete };
