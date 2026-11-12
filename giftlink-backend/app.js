require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./models/db');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => console.log('Connected to DB'))
  .catch((e) => console.error('Failed to connect to DB', e));

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Inside the server'));

const port = process.env.PORT || 3060;
app.listen(port, () => console.log(`Server running on port ${port}`));
