const express = require('express')
const cors = require('cors');
const recreateDatabase = require('./fakerGenerate');
const app = express();

app.use(cors())
app.use(express.json());


const employeesRouter = require('./routes/employeesRoutes');
app.use('/employees', employeesRouter);

const projectsRouter = require('./routes/projectsRoutes');
app.use('/projects', projectsRouter);

const usersRouter = require('./routes/usersRoutes');
app.use('/users', usersRouter);

app.listen(3000, () => {
     //recreateDatabase();
    console.log("Server running on port 3000");
});