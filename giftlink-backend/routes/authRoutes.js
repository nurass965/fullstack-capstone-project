const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const existing = await collection.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);
    const result = await collection.insertOne({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      createdAt: new Date()
    });
    const authtoken = jwt.sign({ user: { id: result.insertedId } }, process.env.JWT_SECRET);
    res.json({ authtoken, email: req.body.email });
  } catch (e) {
    res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const theUser = await collection.findOne({ email: req.body.email });
    if (!theUser) return res.status(404).json({ error: 'User not found' });

    const match = await bcryptjs.compare(req.body.password, theUser.password);
    if (!match) return res.status(404).json({ error: 'Wrong password' });

    const authtoken = jwt.sign({ user: { id: theUser._id.toString() } }, process.env.JWT_SECRET);
    res.json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });
  } catch (e) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
