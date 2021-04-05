const express = require('express');
const bp = require('body-parser')
const fs = require('fs');

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//parse data from another file
var jsonData = fs.readFileSync('Express.json');
var data = JSON.parse(jsonData);

const router1 = express.Router();
router1.route('/book')

.get((req, res) => {
  res.send(data)
})
.post((req , res) => {
    if(schema.validate(req.body).error){
        res.send('kamarad, nezadal si hodnoty korektne')
    }else{
        data.push(req.body);
        console.log(data);
        res.send(data[data.length-1])
    }
  
})

const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    tags: Joi.string().required(),
    id: Joi.number()
});


module.exports = router1;