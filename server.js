const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

require('dotenv').config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);
const clientPromise = mongoClient.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const routes = require('./app/routes/routes');
app.use('/posts', routes)

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});