const express = require('express')
const router = express.Router();
const database = require('./database.js')

router.get('/', async (req, res, next) => {
    res.json({ message: 'welcome' })
})

router.get('/:id', (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})


module.exports = router;