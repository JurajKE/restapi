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
    var unique = getTags().filter((x, i) => getTags().indexOf(x) === i);
    res.send(unique)
    serverResponce(200)
})


//get all tags
const getTags = (book) =>{
  const items = [];
  data.map((item) => {
    item.tags.forEach(element => {
      items.push(element);
    });
  });
  return items;
}

//Emitter Good or bad responce
const serverResponce = (serverStatus) => {
  if(serverStatus == 200){
      return myEmmiter.emit('server responce' , 'Correct opperation, server sent data')
  }else{
      return myEmmiter.emit('server error' , 'Bad operation, server cant responce')
  }}


//Export this module
module.exports = router3;