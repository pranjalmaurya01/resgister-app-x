const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user.model');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
// Registration endpoint

app.post('/register', async (req, res) => {
  mongoose
    .connect(
      'mongodb+srv://arjunkaushik845:7gT6A8fZlHvTC8GK@cluster0.aov1eao.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

  try {
    const { company, email, bizstructure, phone, age } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(202).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ company, email, bizstructure, phone, age });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
