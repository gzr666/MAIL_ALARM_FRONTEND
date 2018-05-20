const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
//require routes for api
const api = require("./server/routes/api");

//declare listening port
const PORT = 3000;


//kreirajmo express aplikaciju
const app = express();

//definirajmo static folder
app.use(express.static(path.join(__dirname,"public")));

//definirajmo bodyparser postavke
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


//cors
app.use(methodOverride("X-HTTP-Method-Override"));

app.use(function(req,res,next){

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    if ('OPTIONS' === req.method) {
    res.send(200);
  } 
  else {
    next();
  }
    

});


//definirajmo rute

app.use("/api",api);

//za sve ostale rute cemo kreirati staticni index.html file
app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,"./public/index.html"));

});



//startajmo aplikaciju
app.listen(PORT,()=>{

    console.log("server listening on port: " + PORT);

});




