const express = require('express');
const bp = require('body-parser')
const fs = require('fs');

const app = express();

//Body Parser
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

const Joi = require('joi');

//Router
const router1 = express.Router();
router1.route('/book')


//Get Request
.get( async (req, res) => {
    res.send(data)
    serverResponce(200);
})

//Post Request
.post( async (req , res) => {

    if(isValid(req.body)){
        res.send('Please check you JSON file')
        serverResponce(404);
    }else{
        res.send(create(req.body));    
        serverResponce(200);
    }
})

//Validate req.body
const isValid = (book) =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        pages: Joi.number().required(),
        tags: Joi.array().items(Joi.string())
    });
    return schema.validate(book).error ? false : true;
}

//create new book
const create = (createBook) => {
    const idNumber = () => { return data[data.length - 1].id + 1}
    data.push({
        ...createBook,
        id: idNumber()
    })
    return data;
}

//Emitter Good or bad responce
const serverResponce = (serverStatus) => {
    if(serverStatus == 200){
        return myEmmiter.emit('server responce' , 'Correct opperation, server sent data')
    }else{
        return myEmmiter.emit('server error' , 'Bad operation, server cant responce')
    }}


//exports this module
module.exports = router1;