const pool = require('./Model.js');

const registerUser = (name, email, password, callback) => {
    const query = 'INSERT INTO students (name, email, password) VALUES ($1, $2, $3)';
    pool.query(query, [name, email, password], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM students WHERE email = $1';
    pool.query(query, [email], callback);
};

module.exports = { registerUser, findUserByEmail };
