// server.js or app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const roomRouter = require('./Routes/Room'); 
app.use('/', roomRouter);

const roleRouter = require('./Routes/Roles'); 
app.use('/', roleRouter);

const departmentsRouter = require('./Routes/Departments'); 
app.use('/', departmentsRouter);

const labsRouter = require('./Routes/labs'); 
app.use('/', labsRouter);

const testRouter = require('./Routes/testrate'); 
app.use('/', testRouter);

const employeeRouter = require('./Routes/employee'); 
app.use('/', employeeRouter);

const EmpprofileRouter = require('./Routes/Empprofile'); 
app.use('/', EmpprofileRouter);

const deassionRouter = require('./Routes/deassion'); 
app.use('/', deassionRouter);

const patientRouter = require('./Routes/patient'); 
app.use('/', patientRouter);

const treatmentRouter = require('./Routes/treatment'); 
app.use('/', treatmentRouter);

const perceptionRouter = require('./Routes/perception'); 
app.use('/', perceptionRouter);

const billRouter = require('./Routes/BILL'); 
app.use('/', billRouter);

const Role_assions_Router = require('./Routes/Role_assions'); 
app.use('/', Role_assions_Router);

app.use('/api/auth', authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
