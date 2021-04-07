const express = require('express');

//Body Parser
const bp = require('body-parser')
const fs = require('fs');
const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

//EventEmiter
const EventEmiter = require('events');
const myEmmiter = new EventEmiter();

myEmmiter.on('server responce' , (arg)=>console.log(arg));

//Router
const router3 = express.Router();
router3.route('/book/tags')

//Get Request
.get( async (req , res) => {
    let tagsList = [];
  
    for (var i = 0; i < data.length; i++){
      tagsList.push(data[i].tags)
    }
    res.send(tagsList)
    myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
})

//Export this module
module.exports = router3;