//express sever
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

// enable body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on post ${port}`));
