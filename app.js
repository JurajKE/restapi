//import all used module
const module1 = require('./bookController')
const module2 = require('./bookidController')
const module3 = require('./bookTagsController')

//express frmaweork
const express = require('express');
const bp = require('body-parser')
const app = express();

const fs = require('fs');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

//used module
app.use(module3 , module2, module1);

//port on localhost
app.listen(3020 , () => console.log('server is running') );