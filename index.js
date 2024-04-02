const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


// Serve static files from the 'public' directory
app.use(express.static('public'));

const username = process.env.MONGOBD_USERNAME;
const password = process.env.MONGOBD_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.bkdg6cw.mongodb.net/Moneytracker`,{
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});


// Define mongoose schema for your data
const userSchema = new mongoose.Schema({
  Category: String,
  Amount: Number,
  Info: String,
  Date: Date,
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define mongoose model based on the schema
const User = mongoose.model('User', userSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/add', async (req, res) => {
  console.log('Received form data:', req.body);
  
  try {
    const { Category, Amount, Info, Date} = req.body;
    const newUser = new User({
      Category,
      Amount,
      Info,
      Date
    });
    await newUser.save();
    console.log('Record Inserted Successfully');
  } catch (error) {
    console.error('Error inserting record:', error);
  }
});


//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

