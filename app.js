require('dotenv').config({ path: './config/.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./config/db');
const app = express();

// Essential Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Template Engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

connectDB();

app.use('/api/delegation', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
