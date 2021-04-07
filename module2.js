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
myEmmiter.on('server error' , (arg)=>console.log(arg));

//Router
const router2 = express.Router();
router2.route('/book/:id')

//Get Request 
.get( async (req, res) =>{
    if(req.params.id < data.length){
        res.send(data.find(item => item.id == req.params.id));
        myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
      }else{
        res.status(404)
        res.send('Book with id: ' +req.params.id + " is not in libary");
        myEmmiter.emit('server error' , 'Bad operation, server cant responce');
      }
})
//Put request
.put( async (req , response) => {

    if(req.params.id > data.length){
      response.status(404)
      response.send('ID is not correct, this id is not exist, please enter correct value.')
      myEmmiter.emit('server error' , 'Bad operation, server cant responce');
    }else{
    var id = req.params.id;
  
      data[id]["title"] = req.body.title;
      data[id]["author"] = req.body.author;
      data[id]["pages"] = req.body.pages;
      data[id]["tags"] = req.body.tags;
  
    //reqwrite file Express.json after put request
    fs.writeFileSync('Express.json' , (JSON.stringify(data)));
    response.send(data);
    myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
  }
  })

  //delete request
  .delete( async (req , res) => {

    var indexOfArray = req.params.id;
  
    if(req.params.id < data.length){
      data.splice(indexOfArray,1)
      res.send(data);
      //reqwrite file Express.json after delete request
      fs.writeFileSync('Express.json' , (JSON.stringify(data)));
      myEmmiter.emit('server responce' , 'Correct opperation, server sent data');

    }else{
      res.status(404)
      res.send('Book with id: ' +req.params.id + " is not in libary!");
      myEmmiter.emit('server error' , 'Bad operation, server cant responce');

    }
  
  })

//export this module
module.exports = router2;