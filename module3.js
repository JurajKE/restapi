const express = require('express');

const bp = require('body-parser')
const fs = require('fs');
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

const EventEmiter = require('events');
const myEmmiter = new EventEmiter();

myEmmiter.on('server responce' , (arg)=>console.log(arg));


const router3 = express.Router();
router3.route('/book/tags')

.get( async (req , res) => {
    let tagsList = [];
  
    for (var i = 0; i < data.length; i++){
      tagsList.push(data[i].tags)
    }
    res.send(tagsList)
    myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
})




module.exports = router3;