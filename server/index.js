require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/error-midellware');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log('Server up on port', PORT));
  } catch (error) {
    console.log(error);
  }
};
start();
