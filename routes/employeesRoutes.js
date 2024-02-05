const express = require('express');
const verifyToken = require('../tokenMiddleware');
const database = require('../database.js')


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var allEmployeesQuery = await database.collection("employees").get();
        var allEmployees = [];
        allEmployeesQuery.forEach(doc => {
            allEmployees.push({ ...doc.data(), id: doc.id });
        });
        res.status(200).json(allEmployees);
    } catch (error) {
        console.log("eroare" + error)

        res.status(500).json({ "message": error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await database.collection("employees").doc(employeeId).get();
        if (employee.exists) {
            var employeeData = employee.data();
            var convertedEmployee = {
                ...employeeData,
                employeedDate: employeeData?.employeedDate?.toDate(),
            }
            res.status(200).send(convertedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/', async (req, res) => {
    try {
        var employee = req.body;
        employee = {
            ...employee,
            employeedDate: new Date(employee.employeedDate)
        }
        console.log(employee)

        var addedEmployeeRef = await database.collection("employees").add(employee);
        var addedEmployee = await addedEmployeeRef.get();
        var employeeData = addedEmployee.data();
        var convertedEmployee = {
            ...employeeData,
            id: addedEmployee.id,
            employeedDate: employeeData?.employeedDate?.toDate()
        }
        res.status(200).send(convertedEmployee);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.put('/:id', (req, res) => {
    try {
        var id = req.params.id;
        var employee = req.body;
        employee = {
            ...employee,
            employeedDate: new Date(employee.employeedDate)
        }
        database.collection("employees").doc(id).update(employee);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deleteResult = await database.collection("employees").doc(employeeId).delete();
        res.status(200).send();
    } catch (error) {
        res.status(500);
    }
})

module.exports = router;