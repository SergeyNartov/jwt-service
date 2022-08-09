require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/error-middleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;
const app = express();

async function surveSwaggerSpecification(req, res) {
  // Swagger definition
  // You can set every attribute except paths and swagger
  // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
  const swaggerDefinition = {
    info: {
      // API informations (required)
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample API', // Description (optional)
    }
  };
  // Options for the swagger docs
  const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ['routes/*.js'],
  };

  return swaggerJsdoc(options);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
 app.use('/api/sagger-ui', swaggerUi.serve, swaggerUi.setup(surveSwaggerSpecification));
// app.get('/sagger-ui', surveSwaggerSpecification);
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log('Server up port', PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
