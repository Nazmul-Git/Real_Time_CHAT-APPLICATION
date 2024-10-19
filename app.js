// EXTERNAL IMPORT
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// INTERNAL IMPORT
const { notFoundMiddleware, errorHandler } = require('./common/errorHandler');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('Database Connection Successful!'))
    .catch(err => console.log(err.message));


// request parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view wngine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


// ROUTING SETUP
app.use(notFoundMiddleware);


// ERROR HANDLING
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`);
})