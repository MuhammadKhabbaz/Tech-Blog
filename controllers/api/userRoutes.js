const express = require('express');
const router = require('express').Router();
const {User} = require('../../models/index');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    try{
        const Users = await User.findAll()
        res.json(Users)
    } catch (err) {
        // Handle errors, such as duplicate email, etc.
        res.status(400).json(err);
    }
})
router.post('/', async (req, res) => {
    try {
        // Create a new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // If the registration is successful, initiate a session
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            
            res.status(201).json({ success: true, message: 'Your account has been created successfully!' });
        });
    } catch (err) {
        // Handle errors, such as duplicate email, etc.
        res.status(400).json(err);
    }
});
router.post('/login', async (req, res) => {
    try {
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ success: false, message: 'Incorrect email or password' });
        return;
      }
  
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});
  
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Set logged_in to false and keep the session
        req.session.logged_in = false;
        req.session.save(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
  
module.exports = router;