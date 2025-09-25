// server.js
// ------------------ Module Imports ------------------
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
console.log(`Running in ${env} mode`);

// Custom Modules
const routes = require('./routes');

const config = require('./config'); // Define constants like PORT in config.js

const authMiddleware = require('./middleware/authMiddleware');
const sqlInjectionMiddleware = require('./middleware/sqlInjectionMiddleware');

// ------------------ Server Setup ------------------
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Set secure headers
app.use(helmet());

// Prevent XSS attacks
app.use(xssClean());

// Prevent HTTP param pollution
// app.use(hpp());
// ------------------ Middleware ------------------
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/', limiter);


// ------------------ Routes ------------------
app.use('/api', authMiddleware, routes); // Main API routes with watchMan middleware


// ------------------ Error Handling ------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// ------------------ Server Start ------------------
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // logger.info(`Server is running on port ${PORT}`);
});
