const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const database = require('../database');

router.post('/login', async (req, res, next) => {
    var userEmail = req.body.userEmail;
    var password = req.body.password;
    try {
        const usersCollectionRef = database.collection("users");
        var result = await usersCollectionRef.where("email", "==", userEmail).get();
        if (result.docs[0].data().password == password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: "Wrong username/password" })
        }

    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(401);
        res.json({ error: 'Invalid credentials' });
    }

    //  res.status(200)
    //  res.json({ message: 'welcome' })
})

router.post('/signup', async (req, res, next) => {

    var userEmail = req.body.username;
    var password = req.body.password;

    try {

        const usersCollectionRef = database.collection("users");

        bcrypt.hash(password, 10, async function (err, hash) {
            await usersCollectionRef.add({ email: userEmail, password: hash });
        });

        console.log('Successfully created new user:', userEmail);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating new user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;