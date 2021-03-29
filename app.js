
const express = require('express');
const bp = require('body-parser')
const fs = require('fs');

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);


//Get all books
app.get('/book', (req , res) => {
  res.send(data)
});


//Get all tags from all books
app.get('/book/tags' , (req , res) => {
  let tagsList = [];

  for (var i = 0; i < data.length; i++){
    tagsList.push(data[i].tags)
  }
  res.send(tagsList)
  })


  //Get book by id
app.get('/book/:id', (req , res) => {

  if(req.params.id < data.length){
    res.send(data.find(item => item.id == req.params.id));
  }else{
    res.status(404)
    res.send('Book with id: ' +req.params.id + " is not in libary");
  }
})

//Delete book by id
app.delete('/book/:id' , (req , res) => {

  var indexOfArray = req.params.id;

  if(req.params.id < data.length){
    data.splice(indexOfArray,1)
    res.send(data);
  }else{
    res.status(404)
    res.send('Book with id: ' +req.params.id + " is not in libary!");
  }

})

//Create a new book
app.post('/book' , (req , res) => {
  
  //automatic generate id if JSON is only string
  if(req.body.id == undefined){
    var lastNumber = data[data.length - 1];
    var valueId = lastNumber.id + 1;
  } 


  data.push(req.body);
  console.log(data);
  res.send(data[data.length-1])

})


//Update existing book
app.put('/book/:id' , (req , response) => {

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


const library = [
    {
    "title": "Robinson Crusoe",
    "author": "Daniel Defoe",
    "pages": 300,
    "tags": [
      "adventure",
      "history"
    ],
    "id": 0
  },
  {
    "title": "The Unbearable Lightness of Being",
    "author": "Milan Kundera",
    "pages": 250,
    "tags": [
      "philosophical",
      "novel"
    ],
    "id": 1
  },
{
  "title": "Nausea",
  "author": "Jean-Paul Sartre",
  "pages": 120,
  "tags": [
    "philosophical",
    "existentialism",
    "novel"
  ],
  "id": 2
},
]

app.listen(3010 , () => console.log('server is running') );