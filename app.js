const module1 = require('./module1')
const module2 = require('./module2')
const module3 = require('./module3')

const express = require('express');
const bp = require('body-parser')
const app = express();

const fs = require('fs');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

app.use(module3 , module2, module1);

app.listen(3015 , () => console.log('server is running') );