const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, findUserByEmail } = require('../Model/userModel');
const pool = require('../Model/Model');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        registerUser(name, email, hashedPassword, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    findUserByEmail(email, async (err, result) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const accessToken = jwt.sign({ email: user.email }, "jwt-access-token-secret-key", { expiresIn: '1d' });
                const refreshToken = jwt.sign({ email: user.email }, "jwt-refresh-token-secret-key", { expiresIn: '1d' });
                res.cookie('accessToken', accessToken, { maxAge: 60000 });
                res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });
                return res.json({ Login: true });
            } else {
                return res.json({ Login: false, Message: "Incorrect password" });
            }
        } else {
            return res.json({ Login: false, Message: "No record found" });
        }
    });
};

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.user;
        const decoded = jwt.verify(token, "jwt-access-token-secret-key");
        req.name = decoded.name;
        req.email = decoded.email;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};

const loginVerification = (req, res) => {
    res.json({
        name: req.name,
        email: req.email,
        login: "success"
    });

}

module.exports = { register, login, protectRoute, loginVerification };
