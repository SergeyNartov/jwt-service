require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/notes', router);


const start = async () => {
  try {
    app.listen(PORT, () => console.log('Server up on port', PORT));
  } catch (error) {
    console.log(error);
  }
};
start();