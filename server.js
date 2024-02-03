const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());


const employeesRouter = require('./employeesRoutes');
app.use('/employees', employeesRouter);

const projectsRouter = require('./projectsRoutes');
app.use('/projects', projectsRouter);

const usersRouter = require('./usersRoutes');
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});