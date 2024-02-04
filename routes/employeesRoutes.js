const express = require('express');
const verifyToken = require('../tokenMiddleware');
const database = require('../database.js')


const router = express.Router();

router.get('/', async (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
    res.json("employee id")
    // console.log(employeesCollectionRef)
    // employeesCollectionRef.doc('whzUBEaSFxoLcLooiaq4').get().then((doc) => {
    //     if (doc.exists) {
    //         console.log(doc.data());
    //     } else {
    //         console.log("Document not found");
    //     }
    // });
})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;