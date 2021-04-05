const express = require('express');

const bp = require('body-parser')
const fs = require('fs');
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

const router2 = express.Router();
router2.route('/book/:id')
.get((req, res) =>{
    if(req.params.id < data.length){
        res.send(data.find(item => item.id == req.params.id));
      }else{
        res.status(404)
        res.send('Book with id: ' +req.params.id + " is not in libary");
      }
})
.put((req , response) => {

    if(req.params.id > data.length){
      response.status(404)
      response.send('ID is not correct, this id is not exist, please enter correct value.')
    }else{
    var id = req.params.id;
  
      data[id]["title"] = req.body.title;
      data[id]["author"] = req.body.author;
      data[id]["pages"] = req.body.pages;
      data[id]["tags"] = req.body.tags;
  
    fs.writeFileSync('Express.json' , (JSON.stringify(data)));
    response.send(data);
  }
  })

  .delete((req , res) => {

    var indexOfArray = req.params.id;
  
    if(req.params.id < data.length){
      data.splice(indexOfArray,1)
      res.send(data);

    }else{
      res.status(404)
      res.send('Book with id: ' +req.params.id + " is not in libary!");

    }
  
  })


module.exports = router2;