const express = require('express');
const { connection } = require('mongoose');
const {cors} = require('cors')
const {connectionDB} = require('./src/config/db')
const app = express();
connectionDB();
app.use(cors());
app.use(express.json()); // be able to handle http request    