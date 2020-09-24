const express = require('express');
const app = express();

var fs = require('fs');
var bodyParser = require('body-parser')
var cors = require('cors');


var data = require('./data');


app.use(cors());
app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('',(req,res)=>{
res.send(`This's Homepage`);
});

app.get('/api',(req,res) => {
res.json(data);

});


app.get('/items/:id',(req,res) => {
    const itemId = req.params.id;
    const item = data.find(_item=>_item.id==itemId)

    if(item){
        res.json(item);
    }else{
        res.json({message:`item ${itemId} doesn't exist`})
    }

    });

 app.post('/create',(req,res)=>{
   var json = req.body;
   data.push(json);
   res.status(201).json(req.body)
   printdata()
 
});   

app.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);
 
    const updatedListItems = [];

    data.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(item);
       } else {
          updatedListItems.push(oldItem);
       }
    });
 
    // replace old list with new one
    data = updatedListItems;
    
    res.json(data);
    printdata()

 });

 app.delete("/items/:id", (req, res) => {
    const itemId = req.params.id;
 
    console.log("Delete item with id: ", itemId);
 
    // filter list copy, by excluding item to delete
    const filtered_list = data.filter(item => item.id !== itemId);
 
    // replace old list with new one
    data = filtered_list;
    
    res.json(data);
    printdata()
 });
 

function printdata(){
   let raw = JSON.stringify(data)
   
   fs.writeFileSync('data.js',`module.exports  = ${raw} ;`)

   return console.log(data)
}

const port = 9000;
app.listen(port,()=>console.log(`Server Runing on port ${port} ...`));