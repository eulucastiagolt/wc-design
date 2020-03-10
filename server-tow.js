var express = require('express');
var app = express();

app.use(express.static("./"));

// app.get('/', function(req, res){
//     res.send("Hello world");
// });

app.listen(3000, function(){
    console.log("express app lsitening on port 3000");
})