const dotenv= require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const expressLayouts= require("express-ejs-layouts");
const mongoose= require("mongoose");

const bodyParser = require("body-parser");



mongoose.connect(process.env.DB_URL)   
const db = mongoose.connection

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

app.set("view engine",'ejs');
app.set("views",__dirname+'/views');
app.set("layout",'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

db.once("open",(err)=>{
    console.log("connected")
})
db.on("error",()=>{
    console.log("There is an error while connecting mongoose")
})



app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.listen(process.env.PORT || 3000)
