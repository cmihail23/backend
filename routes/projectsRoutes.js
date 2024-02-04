const express = require('express')
const router = express.Router();
const database = require('../database.js')
const fakerGenerator = require('../fakerGenerate')

router.get('/', async (req, res) => {
    var allProjectsQuery = await database.collection("projects").get();
    var allProjects = [];
    allProjectsQuery.forEach(doc => {
        allProjects.push(doc.data());
    });
    res.status(200).json(allProjects);
})

router.get('/:id', async (req, res) => {
    const projectId = req.params.id;
    const project = await database.collection("projects").doc(projectId).get();
    if (doc.exists) {
        res.status(200).send(project);
    } else {
        res.status(404).send('Project not found');
    }
})

router.post('/', (req, res, next) => {
    //TODO: Adauga mi proiectul - insert in baza
})

router.put('/:id', (req, res, next) => {
    //edit in baza
})

router.delete('/:id', (req, res, next) => {

})


module.exports = router;