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
        serverResponce(200);
      }else{
        res.send('Book with id: ' +req.params.id + " is not in libary");
        serverResponce(404);
        res.status(404);
      }
})

//Put request
.put( async (req , response) => {

    if(req.params.id > data.length){
      response.send('ID is not correct, this id is not exist, please enter correct value.')
      response.status(404);
      serverResponce(404);
    }else{
      updateBook(req.params.id , req.body);
      response.send(data);
      serverResponce(200);
  }
  })

  //delete request
  .delete( async (req , res) => {
    if(req.params.id < data.length){
      deleteBook(req.body);
      serverResponce(200);
      res.send(data)
    }else{
      res.send('Book with id: ' +req.params.id + " is not in libary!");
      serverResponce(404);
      res.status(404);
    }
  })
 
  //update book
  const updateBook = (id , book) => {
    data[id] = book;
    return data;
  }


  //delete book from libary
  const deleteBook = (book) =>{
    data.splice(book.id , 1)
  }


//Emitter Good or bad responce
const serverResponce = (serverStatus) => {
  if(serverStatus == 200){
      return myEmmiter.emit('server responce' , 'Correct opperation, server sent data')
  }else{
      return myEmmiter.emit('server error' , 'Bad operation, server cant responce')
}}

//export this module
module.exports = router2;