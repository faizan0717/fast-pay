const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://v01d:puiQNMy3fUkvJra7@test-db.dxurd.mongodb.net/?retryWrites=true&w=majority&appName=test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upi_id: { type: String, unique: true },
  balance: { type: Number, unique: true }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Function to generate a unique UIP ID
const generateUIP = () => {
  const randomId = crypto.randomBytes(4).toString('hex'); // Generates a random 8-character ID
  return `${randomId}@fastpay`;
};

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Generate UIP ID
    const upi_id = generateUIP();
    const balance = 1000;

    // Create new user
    user = new User({ name, email, password, upi_id ,balance});
    await user.save();
    res.status(201).send({ message: 'User registered successfully!', upi_id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email)
        console.log(password)
      // Find user by email
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
      console.log(user)
      res.status(200).send({ message: 'Login successful!', upi_id: user.upi_id, balance: user.balance });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
