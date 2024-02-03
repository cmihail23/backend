const express = require('express');
const verifyToken = require('./tokenMiddleware');
const fakerGenerator = require('./fakerGenerate')


const router = express.Router();

router.get('/', async (req, res, next) => {
    // await fakerGenerator();
    

    res.json({ "Message": "succes" })
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

router.post('/', verifyToken, (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;