require("dotenv").config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
const router = express.Router()
var usersRouter = require('./routes/users');
var ideasRouter = require('./routes/ideas')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI); //mongodb://localhost/idea-board

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');
});
// If the connection throws an error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/client/build/'));

  app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
  })

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/:userId/ideas', ideasRouter)

module.exports = app;