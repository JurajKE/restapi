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

//Router
const router1 = express.Router();
router1.route('/book')

//Get Request
.get( async (req, res) => {
        res.send(data)
        myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
        
})
//Post Request
.post( async (req , res) => {
    if(schema.validate(req.body).error){
        res.send('kamarad, nezadal si hodnoty korektne')
        myEmmiter.emit('server error' , 'Bad operation, server cant responce');
    }else{
        data.push(req.body);
        res.send(data[data.length-1])
        //reqwrite file Express.json after post request
        fs.writeFileSync('Express.json' , (JSON.stringify(data)));
        myEmmiter.emit('server responce' , 'Correct opperation, server sent data');
    }
})


//Joi for validate input
const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    tags: Joi.string().required(),
    id: Joi.number()
});

//exports this module
module.exports = router1;