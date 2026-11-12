const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('gifts').find({}).toArray();
    res.json(gifts);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection('gifts').findOne({ id: req.params.id });
    if (!gift) return res.status(404).send('Gift not found');
    res.json(gift);
  } catch (e) { next(e); }
});

module.exports = router;
