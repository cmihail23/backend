const express = require('express')
const router = express.Router();
const database = require('../database.js')

router.get('/', async (req, res) => {
    try {
        var allProjectsQuery = await database.collection("projects").get();
        var allProjects = [];
        allProjectsQuery.forEach(doc => {
            allProjects.push({ ...doc.data(), id: doc.id });
        });
        res.status(200).json(allProjects);
    } catch (error) {
        res.status(500).json({ "message": error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await database.collection("projects").doc(projectId).get();
        if (project.exists) {
            var projectData = project.data();
            var convertedProject = {
                ...projectData,
                projectStartDate: projectData?.projectStartDate?.toDate(),
                projectEndDate: projectData?.projectEndDate?.toDate()
            }
            res.status(200).send(convertedProject);
        } else {
            res.status(404).send('Project not found');
        }
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/', async (req, res) => {
    try {
        var project = req.body;
        project = {
            ...project,
            projectStartDate: new Date(project.projectStartDate),
            projectEndDate: new Date(project.projectEndDate)
        }
        console.log(project)

        var addedProjectRef = await database.collection("projects").add(project);
        var addedProject = await addedProjectRef.get();
        var projectData = addedProject.data();
        var convertedProject = {
            ...projectData,
            id: addedProject.id,
            projectStartDate: projectData?.projectStartDate?.toDate(),
            projectEndDate: projectData?.projectEndDate?.toDate()
        }
        res.status(200).send(convertedProject);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.put('/:id', (req, res) => {
    try {
        var id = req.params.id;
        var project = req.body;
        project = {
            ...project,
            projectStartDate: new Date(project.projectStartDate),
            projectEndDate: new Date(project.projectEndDate)
        }
        database.collection("projects").doc(id).update(project);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const deleteResult = await database.collection("projects").doc(projectId).delete();
        res.status(200).send();
    } catch (error) {
        res.status(500);
    }
})


module.exports = router;